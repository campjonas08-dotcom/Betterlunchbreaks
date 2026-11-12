"""Browser acceptance checks. Start the README's local server first.
Run with a Python environment containing playwright and system Chromium.
"""
import os
from io import BytesIO
from pathlib import Path
from PIL import Image
import zxingcpp
from playwright.sync_api import sync_playwright, expect

BASE = os.environ.get('BLB_TEST_URL', 'http://127.0.0.1:8000/Betterlunchbreaks/')
ARTIFACTS = Path(os.environ.get('BLB_ARTIFACTS', '/tmp/blb-test-artifacts'))
ARTIFACTS.mkdir(parents=True, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(executable_path='/usr/bin/chromium', args=['--no-sandbox'])
    for label, viewport in [('desktop', {'width': 1440, 'height': 1000}), ('phone', {'width': 390, 'height': 844})]:
        context = browser.new_context(viewport=viewport, is_mobile=label == 'phone', has_touch=label == 'phone')
        page = context.new_page()
        errors = []
        page.on('pageerror', lambda error: errors.append(str(error)))
        page.goto(BASE)
        expect(page.locator('#open-count')).to_have_text('183')
        page.get_by_role('button', name='The Village', exact=False).click()
        expect(page.locator('#preview-panel')).to_be_visible()
        page.locator('#back-edge').click()
        page.locator('#show-chart').click()
        expect(page.locator('#section-count')).to_have_text('16 of 24 seats open')
        page.locator('#demo-scan').click()
        dialog = page.locator('#table-dialog')
        # Occupied seats stay discoverable and give explicit feedback.
        dialog.get_by_role('button', name='Seat A1-1, taken', exact=True).click()
        expect(page.locator('#table-status')).to_contain_text('is taken')
        dialog.get_by_role('button', name='Seat A1-2, open', exact=True).click()
        expect(page.locator('#open-count')).to_have_text('182')
        expect(page.locator('#filled-count')).to_have_text('142')
        expect(page.locator('#forecast-open')).to_have_text('182')
        expect(page.locator('#section-count')).to_have_text('15 of 24 seats open')
        dialog.get_by_role('button', name='Seat A1-2, your seat', exact=True).click()
        expect(page.locator('#table-status')).to_contain_text('already checked in')
        dialog.get_by_role('button', name='Seat A1-3, open', exact=True).click()
        expect(page.locator('#table-status')).to_contain_text('already have seat')
        expect(page.locator('#filled-count')).to_have_text('142')
        page.reload()
        expect(page.locator('#my-seat-label')).to_contain_text('Seat 2')
        expect(page.locator('#open-count')).to_have_text('182')
        page.locator('#checkout').click()
        expect(page.locator('#open-count')).to_have_text('183')
        expect(page.locator('#my-seat')).to_be_hidden()
        page.goto(BASE + '?table=A2')
        expect(dialog).to_be_visible()
        expect(page.locator('#table-title')).to_have_text('The Edge · Table A2')
        page.reload()
        expect(dialog).to_be_visible()
        dialog.get_by_role('button', name='Seat A2-1, open', exact=True).click()
        expect(page.locator('#filled-count')).to_have_text('142')
        page.keyboard.press('Escape')
        page.locator('#reset').click()
        expect(page.locator('#filled-count')).to_have_text('141')
        expect(page.locator('#section-count')).to_have_text('16 of 24 seats open')
        page.reload()
        expect(page.locator('#filled-count')).to_have_text('141')
        page.keyboard.press('Escape')
        page.goto(BASE + '?table=%3Cscript%3E')
        expect(page.locator('#status')).to_contain_text('Invalid table link')
        expect(dialog).not_to_be_visible()
        page.locator('#sticker-open').click()
        page.locator('#public-url').fill('javascript:alert(1)')
        page.locator('#generate-sticker').click()
        expect(page.locator('#sticker-status')).to_contain_text('complete http or https')
        page.locator('#public-url').fill('https://campjonas08-dotcom.github.io/Betterlunchbreaks/')
        page.locator('#sticker-table').select_option('A3')
        page.locator('#generate-sticker').click()
        expect(page.locator('#qr-link')).to_have_attribute('href', 'https://campjonas08-dotcom.github.io/Betterlunchbreaks/?table=A3')
        expect(page.locator('#qr svg')).to_be_visible()
        for table in ['A1', 'A2', 'A3', 'A4', 'A5', 'A6']:
            page.locator('#sticker-table').select_option(table)
            page.locator('#generate-sticker').click()
            decoded = zxingcpp.read_barcode(Image.open(BytesIO(page.locator('#qr').screenshot())))
            assert decoded and decoded.text == f'https://campjonas08-dotcom.github.io/Betterlunchbreaks/?table={table}'
        page.screenshot(path=str(ARTIFACTS / f'{label}-sticker.png'), full_page=True)
        page.emulate_media(media='print')
        expect(page.locator('#sticker')).to_be_visible()
        expect(page.locator('.topbar')).to_be_hidden()
        page.emulate_media(media='screen')
        page.keyboard.press('Escape')
        page.goto(BASE)
        # The first keyboard stop is a working skip link.
        page.keyboard.press('Tab')
        expect(page.locator('.skip')).to_be_focused()
        page.keyboard.press('Enter')
        page.locator('#show-chart').focus()
        page.keyboard.press('Enter')
        expect(page.locator('#seating')).to_be_visible()
        page.locator('#demo-scan').focus()
        page.keyboard.press('Enter')
        expect(dialog).to_be_visible()
        # Modal focus remains inside the dialog while tabbing.
        for _ in range(10):
            page.keyboard.press('Tab')
            assert page.evaluate("document.activeElement.closest('dialog')?.id") == 'table-dialog'
        page.keyboard.press('Escape')
        assert page.evaluate('document.documentElement.scrollWidth <= innerWidth'), 'Horizontal overflow'
        page.screenshot(path=str(ARTIFACTS / f'{label}-seating.png'), full_page=True)
        page.locator('#show-chart').click()
        page.screenshot(path=str(ARTIFACTS / f'{label}-overview.png'), full_page=True)
        assert not errors, errors
        print(f'PASS {label}: selection, counts, occupied/repeat checks, persistence, checkout, reset, deep links, invalid link, QR, print, keyboard, layout; no JS errors')
        context.close()
    # Storage disabled must leave the demo usable with honest feedback.
    context = browser.new_context()
    context.add_init_script("Object.defineProperty(window, 'localStorage', {get() {throw new Error('blocked')}})")
    page = context.new_page()
    page.goto(BASE + '?table=A1')
    page.locator('#table-dialog').get_by_role('button', name='Seat A1-2, open', exact=True).click()
    expect(page.locator('#table-status')).to_contain_text('will not survive a refresh')
    expect(page.locator('#open-count')).to_have_text('182')
    print('PASS storage-unavailable fallback')
    print('Browser:', browser.version)
    browser.close()
