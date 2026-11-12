"""Dining schedule and full ported tracker acceptance checks."""
import os,json
from pathlib import Path
from playwright.sync_api import sync_playwright, expect
BASE=os.environ.get('BLB_TEST_URL','http://127.0.0.1:8000/Betterlunchbreaks/')
ARTIFACTS=Path(os.environ.get('BLB_ARTIFACTS','/tmp/blb-test-artifacts'));ARTIFACTS.mkdir(parents=True,exist_ok=True)
with sync_playwright() as p:
    browser=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox'])
    for label,width in [('desktop',1440),('phone',390),('narrow',320)]:
        context=browser.new_context(viewport={'width':width,'height':900},accept_downloads=True)
        page=context.new_page();errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
        page.goto(BASE)
        expect(page.locator('#wait-count')).to_have_text('25')
        expect(page.locator('#open-count')).to_have_text('5–25')
        assert page.locator('#rush-chart button').count()==19
        for slot,wait in [('3','13'),('7','19'),('9','23'),('10','18'),('12','3'),('15','16')]:
            page.locator('#dining-time').select_option(slot);expect(page.locator('#wait-count')).to_have_text(wait)
        page.get_by_role('button',name='12:00 PM, 25 minute wait',exact=True).click()
        expect(page.locator('#wait-count')).to_have_text('25')
        assert 'live' not in page.locator('body').inner_text().lower()
        assert page.evaluate('document.documentElement.scrollWidth <= innerWidth')
        page.locator('h1').click();page.screenshot(path=str(ARTIFACTS/f'{label}-daily-dining.png'),full_page=True)
        page.locator('.page-nav').get_by_role('link',name='Dining Dollars').click()
        expect(page.locator('#ob-start-btn')).to_be_visible()
        page.locator('#ob-balance').fill('500');page.locator('#ob-term-start').fill('2026-01-05');page.locator('#ob-term-end').fill('2026-12-18')
        page.locator('#ob-start-btn').click();page.locator('#close-tutorial').click()
        expect(page.locator('.hero-metric')).to_be_visible()
        assert page.evaluate('activeBudget().balance')==500
        page.locator('#tab-log').click();page.locator('[data-amt="12"]').click();page.locator('#spend-note').fill('Lunch at The Edge');page.locator('#confirm-spend').click()
        assert page.evaluate('activeBudget().balance')==488
        page.reload();assert page.evaluate('activeBudget().balance')==488
        page.locator('#open-history').click();page.locator('#hist-search').fill('Lunch at The Edge')
        page.locator('#hist-rows [data-entry]').click();page.locator('#ee-amount').fill('10.50');page.locator('#save-edit-entry').click()
        assert page.evaluate('activeBudget().balance')==489.5
        page.locator('#close-history').click()
        page.locator('#tab-insights').click();expect(page.locator('#close-insights')).to_be_visible()
        expect(page.locator('.overlay')).to_contain_text('By category');page.locator('#close-insights').click()
        page.locator('#open-update').click();page.locator('#update-amount').fill('480');page.locator('#confirm-update').click();assert page.evaluate('activeBudget().balance')==480
        page.locator('#tab-settings').click()
        with page.expect_download() as info:page.locator('#btn-export-csv').click()
        assert 'Lunch at The Edge' in Path(info.value.path()).read_text()
        with page.expect_download() as info:page.locator('#btn-export-backup').click()
        backup=Path(info.value.path()).read_bytes();assert json.loads(backup)['config']['budgets'][0]['balance']==480
        page.locator('#edit-term-btn').click();page.locator('#tf-holiday-input').fill('2026-11-23');page.locator('#tf-add-holiday').click();page.locator('#save-term-form').click()
        assert '2026-11-23' in page.evaluate('config.holidays')
        page.locator('#tab-settings').click();page.locator('#add-budget-btn').click();page.locator('#bf-name').fill('Coffee fund');page.locator('#bf-total').fill('100');page.locator('#bf-balance').fill('100');page.locator('#save-budget-form').click()
        assert page.evaluate('config.budgets.length')==2
        expect(page.locator('.budget-tab[data-budget]')).to_have_count(2)
        page.locator('.budget-tab[data-budget="fund-1"]').click()
        page.locator('#tab-settings').click();page.locator('#import-file-input').set_input_files({'name':'backup.json','mimeType':'application/json','buffer':backup});page.locator('#cf-ok').click()
        assert page.evaluate('config.budgets.length')==1
        assert page.evaluate('activeBudget().balance')==480
        page.locator('#open-history').click();page.locator('#hist-search').fill('Lunch at The Edge');page.locator('#hist-rows [data-entry]').click();page.locator('#delete-edit-entry').click();page.locator('#cf-ok').click()
        assert page.evaluate("activeBudget().history.filter(h=>h.type==='spend').length")==0
        page.locator('#close-history').click()
        page.locator('#tab-settings').click();page.locator('[data-theme-mode="dark"]').click();expect(page.locator('html')).to_have_attribute('data-theme','dark');page.locator('[data-theme-mode="light"]').click()
        for _ in range(8):
            page.keyboard.press('Tab');assert page.evaluate("Boolean(document.activeElement.closest('[role=dialog]'))")
        page.keyboard.press('Escape');expect(page.locator('.overlay')).to_have_count(0)
        assert page.evaluate('document.documentElement.scrollWidth <= innerWidth')
        page.locator('h1').click();page.screenshot(path=str(ARTIFACTS/f'{label}-full-tracker.png'),full_page=True)
        assert not errors,errors
        print(f'PASS {label}: all-day dining peaks, chart selection, full tracker onboarding, daily metrics, purchase/edit/delete, persistence, insights, balance correction, CSV/backup/restore, holidays, multiple funds, themes, keyboard sheets and layout')
        context.close()
    # Prior release data survives the full tracker port.
    context=browser.new_context();page=context.new_page();page.goto(BASE)
    old={'total':50000,'starting':40000,'reserve':5000,'start':'2026-01-05','end':'2026-12-18','holidays':['2026-11-23'],'purchases':[{'id':'old','amount':1200,'date':'2026-11-12','category':'Meal','note':'Existing lunch'}]}
    page.evaluate('(data)=>localStorage.setItem("better-lunch-budget-v2",JSON.stringify(data))',old);page.goto(BASE+'dollars.html')
    assert page.evaluate('activeBudget().balance')==388
    assert page.evaluate('activeBudget().targetReserve')==50
    assert page.evaluate('activeBudget().history[1].note')=='Existing lunch'
    page.reload();assert page.evaluate('activeBudget().balance')==388
    print('PASS old balance/history/term migration and reload')
    context.close()
    context=browser.new_context();context.add_init_script("Object.defineProperty(window,'localStorage',{get(){throw Error('blocked')}})")
    page=context.new_page();page.goto(BASE+'dollars.html');expect(page.locator('#storage-warning')).to_be_visible();page.locator('#ob-balance').fill('500');page.locator('#ob-start-btn').click();page.locator('#close-tutorial').click();expect(page.locator('.hero-metric')).to_be_visible()
    print('PASS storage-unavailable session with visible warning')
    print('Browser:',browser.version);browser.close()
