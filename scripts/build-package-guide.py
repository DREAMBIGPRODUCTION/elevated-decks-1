#!/usr/bin/env python3
"""Build the 2026 Elevated Decks Material Selection Guide PDF."""

from __future__ import annotations

import os
import shutil
from reportlab.lib.colors import Color, HexColor, white, black
from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LOGO = "/home/dbsu33/projects/LOGO ELEVATED DECKS.png"
PHOTOS = "/home/dbsu33/projects/package_guide_assets/photos"
OUT = os.path.join(ROOT, "public", "package-options.pdf")
W, H = letter

pdfmetrics.registerFont(TTFont("Sans", "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"))
pdfmetrics.registerFont(TTFont("SansBold", "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"))
pdfmetrics.registerFont(TTFont("Serif", "/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf"))
pdfmetrics.registerFont(TTFont("SerifBold", "/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf"))
pdfmetrics.registerFont(TTFont("SerifItalic", "/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf"))

INK = HexColor("#1C1917")
MUTED = HexColor("#57534E")
GOLD = HexColor("#8B7355")
CREAM = HexColor("#F6F1E8")
PAPER = HexColor("#FBF8F2")
LINE = HexColor("#E7E0D4")
PT = HexColor("#57534E")
GOOD = HexColor("#6B7280")
BETTER = HexColor("#5F6F52")
BEST = HexColor("#3F4F3A")
NAVY = HexColor("#1C1917")


def rgb(hex_color: str) -> Color:
    return HexColor(hex_color)


def wrap(c: canvas.Canvas, text: str, font: str, size: float, width: float) -> list[str]:
    words = text.split()
    lines, cur = [], ""
    for word in words:
        trial = f"{cur} {word}".strip()
        if c.stringWidth(trial, font, size) <= width:
            cur = trial
        else:
            if cur:
                lines.append(cur)
            cur = word
    if cur:
        lines.append(cur)
    return lines


def draw_wrapped(c, text, x, y, font, size, width, leading=None, color=INK, align="left"):
    leading = leading or size * 1.35
    lines = wrap(c, text, font, size, width)
    c.setFillColor(color)
    c.setFont(font, size)
    for i, line in enumerate(lines):
        yy = y - i * leading
        if align == "center":
            c.drawCentredString(x, yy, line)
        else:
            c.drawString(x, yy, line)
    return len(lines) * leading


def header(c, title: str, key: str):
    c.setFillColor(PAPER)
    c.rect(0, 0, W, H, fill=1, stroke=0)
    c.setFillColor(NAVY)
    c.rect(0, H - 46, W, 46, fill=1, stroke=0)
    c.setFillColor(GOLD)
    c.rect(0, H - 50, W, 4, fill=1, stroke=0)
    c.setFillColor(white)
    c.setFont("Sans", 8)
    c.drawString(0.6 * inch, H - 22, "ELEVATED DECKS  ·  MATERIAL SELECTION GUIDE  ·  2026")
    c.setFont("SerifBold", 16)
    c.drawRightString(W - 0.6 * inch, H - 26, title)
    c.bookmarkPage(key)
    c.addOutlineEntry(title, key, 0, 0)


def footer(c, page: int, total: int = 8):
    c.setFillColor(NAVY)
    c.rect(0, 0, W, 34, fill=1, stroke=0)
    c.setFillColor(GOLD)
    c.rect(0, 34, W, 3, fill=1, stroke=0)
    c.setFillColor(HexColor("#D6D3D1"))
    c.setFont("Sans", 8)
    c.drawString(0.6 * inch, 14, "elevateddecksny.com  ·  (838) 280-0308  ·  sales@elevateddecksny.com")
    c.drawRightString(W - 0.6 * inch, 14, f"{page}  /  {total}")


def badge(c, x, y, label, fill, w=62, h=16):
    c.setFillColor(fill)
    c.roundRect(x, y, w, h, 3, fill=1, stroke=0)
    c.setFillColor(white)
    c.setFont("SansBold", 7.5)
    c.drawCentredString(x + w / 2, y + 4.5, label)


def link_line(c, text, url, x, y, font="Sans", size=8, color=GOLD):
    c.setFillColor(color)
    c.setFont(font, size)
    c.drawString(x, y, text)
    tw = c.stringWidth(text, font, size)
    c.linkURL(url, (x, y - 2, x + tw, y + size), relative=0)
    c.setStrokeColor(color)
    c.setLineWidth(0.4)
    c.line(x, y - 1.2, x + tw, y - 1.2)


def swatches(c, x, y, items, col_w=88, row_h=26, per_row=4):
    for i, (name, hex_color) in enumerate(items):
        sx = x + (i % per_row) * col_w
        sy = y - (i // per_row) * row_h
        c.setFillColor(rgb(hex_color))
        c.roundRect(sx, sy, 12, 12, 2, fill=1, stroke=0)
        c.setStrokeColor(HexColor("#D6D3D1"))
        c.setLineWidth(0.4)
        c.roundRect(sx, sy, 12, 12, 2, fill=0, stroke=1)
        c.setFillColor(INK)
        c.setFont("Sans", 6.3)
        lines = wrap(c, name, "Sans", 6.3, col_w - 20)[:2]
        for j, line in enumerate(lines):
            c.drawString(sx + 16, sy + 6 - j * 7.2, line)
    rows = (len(items) + per_row - 1) // per_row
    return rows * row_h


def card(c, x, y, w, h, fill=PAPER, stroke=LINE, url=None):
    c.setFillColor(fill)
    c.setStrokeColor(stroke)
    c.setLineWidth(0.8)
    c.roundRect(x, y, w, h, 8, fill=1, stroke=1)
    if url:
        c.linkURL(url, (x, y, x + w, y + h), relative=0, thickness=0)


def photo(c, path, x, y, w, h, radius=0):
    if not path or not os.path.exists(path):
        c.setFillColor(LINE)
        c.rect(x, y, w, h, fill=1, stroke=0)
        return
    img = ImageReader(path)
    iw, ih = img.getSize()
    scale = max(w / iw, h / ih)
    nw, nh = iw * scale, ih * scale
    c.saveState()
    p = c.beginPath()
    if radius:
        p.roundRect(x, y, w, h, radius)
    else:
        p.rect(x, y, w, h)
    c.clipPath(p, stroke=0)
    c.drawImage(img, x + (w - nw) / 2, y + (h - nh) / 2, width=nw, height=nh, mask="auto")
    c.restoreState()


def photo_path(name: str) -> str:
    return os.path.join(PHOTOS, name)


def cover(c):
    c.setFillColor(NAVY)
    c.rect(0, 0, W, H, fill=1, stroke=0)
    c.setFillColor(GOLD)
    c.rect(0, 0, 18, H, fill=1, stroke=0)
    c.rect(W - 18, 0, 18, H, fill=1, stroke=0)
    if os.path.exists(LOGO):
        from PIL import Image as PILImage

        tmp_logo = "/tmp/ed-logo-on-cream.png"
        im = PILImage.open(LOGO).convert("RGBA")
        bg = PILImage.new("RGBA", im.size, (246, 241, 232, 255))
        bg.paste(im, mask=im.split()[-1] if im.mode == "RGBA" else None)
        # Knock out near-white so the cream plate shows around the line art.
        px = bg.load()
        w0, h0 = bg.size
        for yy in range(h0):
            for xx in range(w0):
                r, g, b, a = px[xx, yy]
                if r > 245 and g > 245 and b > 245:
                    px[xx, yy] = (246, 241, 232, 255)
        bg.save(tmp_logo)
        c.setFillColor(CREAM)
        c.roundRect(W / 2 - 92, H - 236, 184, 126, 12, fill=1, stroke=0)
        c.drawImage(tmp_logo, W / 2 - 78, H - 222, width=156, height=100, preserveAspectRatio=True, anchor="c")
    c.setFillColor(GOLD)
    c.setFont("Sans", 10)
    c.drawCentredString(W / 2, H - 250, "ELEVATED DECKS  ·  CAPITAL REGION, NY")
    c.setFillColor(white)
    c.setFont("SerifBold", 36)
    for i, line in enumerate(["Material", "Selection", "Guide"]):
        c.drawCentredString(W / 2, H - 310 - i * 42, line)
    c.setStrokeColor(GOLD)
    c.setLineWidth(1.2)
    c.line(W / 2 - 90, H - 445, W / 2 + 90, H - 445)
    c.setFillColor(GOLD)
    c.setFont("SansBold", 11)
    c.drawCentredString(W / 2, H - 470, "PRESSURE TREATED   ·   GOOD   ·   BETTER   ·   BEST")
    c.setFillColor(HexColor("#D6D3D1"))
    c.setFont("Sans", 10)
    c.drawCentredString(W / 2, H - 500, "Trex  ·  TimberTech Advanced PVC  ·  TimberTech Composite")
    c.setFont("Sans", 9)
    c.drawCentredString(W / 2, 90, "Fact-checked to manufacturer specs  ·  August 2026")
    c.setFillColor(GOLD)
    c.setFont("Sans", 9)
    c.drawCentredString(W / 2, 68, "elevateddecksny.com   ·   (838) 280-0308")
    c.bookmarkPage("cover")
    c.addOutlineEntry("Cover", "cover", 0, 0)
    c.showPage()


def page_overview(c):
    header(c, "How the packages work", "overview")
    y = H - 78
    y -= draw_wrapped(
        c,
        "A package is the boards, railing, and trim on the same deck. Framing, stairs, and layout stay the same — only the surface materials change. Your estimate lists all four packages so you can pick the look, upkeep, and warranty that fit.",
        0.6 * inch,
        y,
        "Sans",
        10,
        W - 1.2 * inch,
        color=MUTED,
    )
    y -= 18

    rows = [
        ("", "Pressure Treated", "Good", "Better", "Best"),
        ("Decking", "Outdoor PT wood", "Trex Select composite", "Trex Transcend / Lineage, or TimberTech Terrain / Harvest PVC", "TimberTech Vintage or Landmark PVC, or Legacy composite"),
        ("Railing", "PT wood rail or Titan Pro vinyl", "Titan Pro vinyl or Trex Select / Enhance", "Trex Transcend composite or TimberTech RadianceRail Express", "TimberTech / AZEK rail, Trex Signature aluminum, or cable (quoted)"),
        ("Trim", "PT fascia", "White PVC fascia", "Matching Trex or TimberTech fascia", "Matching TimberTech / AZEK fascia"),
        ("Board warranty", "Treater warranty on the lumber (varies)", "Trex Select: 35-year limited residential fade & stain", "Trex Transcend / Lineage: 50-year. Harvest PVC: lifetime product + 50-year fade & stain. Terrain: 30-year.", "Vintage / Landmark PVC: lifetime product + 50-year fade & stain. Legacy composite: 30-year."),
        ("Our workmanship", "3 years", "3 years", "3 years", "5 years"),
        ("Upkeep", "Stain / seal on a schedule or it will gray", "Soap and water", "Soap and water", "Soap and water"),
        ("Best if you want", "The lowest price and a real-wood look", "Composite at the lowest composite price", "Our most popular mix of look, color, and warranty", "The richest grain, PVC performance, and longest board coverage"),
    ]
    col_w = [88, 108, 108, 128, 128]
    x0 = 0.5 * inch
    row_h = 58
    c.setFont("SansBold", 7)
    for r, row in enumerate(rows):
        x = x0
        hy = y - r * row_h
        bg = NAVY if r == 0 else (CREAM if r % 2 else PAPER)
        c.setFillColor(bg)
        c.rect(x0, hy - row_h + 8, sum(col_w), row_h, fill=1, stroke=0)
        for i, cell in enumerate(row):
            color = white if r == 0 else INK
            font = "SansBold" if r == 0 or i == 0 else "Sans"
            size = 6.6 if r > 0 else 7.2
            draw_wrapped(c, cell, x + 6, hy - 6, font, size, col_w[i] - 12, leading=8.4, color=color)
            x += col_w[i]
        c.setStrokeColor(LINE)
        c.setLineWidth(0.4)
        c.line(x0, hy - row_h + 8, x0 + sum(col_w), hy - row_h + 8)

    y = y - len(rows) * row_h - 8
    y -= draw_wrapped(
        c,
        "Manufacturer warranties cover the boards and rails against defects, fade, and stain as written in each brand’s current limited warranty. Elevated Decks warrants workmanship separately. Color availability is local stock — we confirm the exact SKU in writing before we order. Order free samples from Trex or TimberTech so you can see the board in your light.",
        0.6 * inch,
        y,
        "Sans",
        8,
        W - 1.2 * inch,
        color=MUTED,
        leading=11,
    )
    footer(c, 2)
    c.showPage()


def page_packages(c):
    header(c, "The four packages", "packages")
    packs = [
        (
            "PRESSURE TREATED",
            PT,
            "Real wood. Lowest price.",
            [
                "Southern yellow pine treated for outdoor use. Real wood underfoot.",
                "Needs stain or seal on a schedule, or it will gray and check.",
                "Rail: matching PT, or upgrade independently.",
            ],
            "pt.jpg",
            None,
        ),
        (
            "GOOD",
            GOOD,
            "Composite, lowest composite price.",
            [
                "Trex Select® — 95% recycled composite. Soap-and-water upkeep.",
                "35-year limited residential fade & stain on the boards.",
                "Rail: Titan Pro® vinyl or Trex Select / Enhance. White PVC fascia.",
            ],
            "select.jpg",
            "https://www.trex.com/products/decking/select/",
        ),
        (
            "BETTER",
            BETTER,
            "Our most popular package.",
            [
                "Trex Transcend® / Lineage®, TimberTech Terrain®, or Harvest PVC.",
                "50-year Trex. 30-year Terrain. Harvest: lifetime + 50-year fade & stain.",
                "Rail: Trex Transcend or TimberTech RadianceRail Express®.",
            ],
            "transcend.jpg",
            "https://www.trex.com/products/decking/transcend/",
        ),
        (
            "BEST",
            BEST,
            "Premium PVC or top composite.",
            [
                "PVC: Vintage® or Landmark®. Composite option: Legacy®.",
                "PVC: lifetime + 50-year fade & stain. Legacy: 30-year — not 50.",
                "Rail: TimberTech / AZEK, Trex Signature®, or cable. 5-year workmanship.",
            ],
            "vintage_official.jpg",
            "https://www.timbertech.com/product/azek-vintage-collection/",
        ),
    ]
    gap = 10
    card_h = 318
    card_w = (W - 1.2 * inch - gap) / 2
    photo_h = 102
    positions = [
        (0.6 * inch, H - 78 - card_h),
        (0.6 * inch + card_w + gap, H - 78 - card_h),
        (0.6 * inch, H - 78 - card_h * 2 - gap),
        (0.6 * inch + card_w + gap, H - 78 - card_h * 2 - gap),
    ]
    for (title, color, tag, bullets, img, url), (x, y) in zip(packs, positions):
        card(c, x, y, card_w, card_h, url=url)
        c.setFillColor(color)
        c.roundRect(x, y + card_h - 26, card_w, 26, 8, fill=1, stroke=0)
        c.rect(x, y + card_h - 26, card_w, 12, fill=1, stroke=0)
        c.setFillColor(white)
        c.setFont("SansBold", 11)
        c.drawString(x + 12, y + card_h - 17, title)
        photo(c, photo_path(img), x + 1, y + card_h - 26 - photo_h, card_w - 2, photo_h)
        c.setFillColor(GOLD)
        c.setFont("SansBold", 8)
        c.drawString(x + 12, y + card_h - photo_h - 42, tag)
        yy = y + card_h - photo_h - 58
        for bullet in bullets:
            c.setFillColor(GOLD)
            c.circle(x + 16, yy + 3, 1.6, fill=1, stroke=0)
            used = draw_wrapped(c, bullet, x + 24, yy, "Sans", 8, card_w - 38, leading=10.5, color=INK)
            yy -= used + 5
    footer(c, 3)
    c.showPage()


def collection_block(
    c, x, y, w, h, title, package, pkg_color, sub, colors, url, notes, per_row=4, img=None, photo_h=88
):
    card(c, x, y - h, w, h, url=url)
    if img:
        photo(c, photo_path(img), x + 1, y - photo_h - 1, w - 2, photo_h, radius=7)
        badge(c, x + 8, y - photo_h + 8, package, pkg_color, 70 if len(package) < 8 else 88)
        text_top = y - photo_h - 18
    else:
        badge(c, x + 10, y - 26, package, pkg_color, 70 if len(package) < 8 else 88)
        text_top = y - 26
    c.setFillColor(INK)
    c.setFont("SerifBold", 12)
    c.drawString(x + 12, text_top - 16, title)
    c.setFillColor(GOLD)
    c.setFont("Sans", 8)
    c.drawString(x + 12, text_top - 30, "Tap the card for the manufacturer page →")
    used = draw_wrapped(c, sub, x + 12, text_top - 46, "Sans", 8, w - 24, leading=10.4, color=MUTED)
    swatch_top = text_top - 46 - used - 8
    swatch_h = swatches(c, x + 12, swatch_top, colors, col_w=(w - 24) / per_row, per_row=per_row)
    draw_wrapped(c, notes, x + 12, swatch_top - swatch_h - 8, "Sans", 7, w - 24, leading=9.2, color=MUTED)


def page_trex(c):
    header(c, "Trex decking", "trex")
    y = H - 72
    y -= draw_wrapped(
        c,
        "Trex is the composite we use most. Boards are made in the USA from about 95% recycled plastic film and reclaimed sawdust, with a protective shell. Click a collection name on the manufacturer page to order samples.",
        0.6 * inch,
        y,
        "Sans",
        9.5,
        W - 1.2 * inch,
        color=MUTED,
    )
    gap = 10
    col = (W - 1.2 * inch - gap) / 2
    left, right = 0.6 * inch, 0.6 * inch + col + gap
    top = y - 12
    collection_block(
        c,
        left,
        top,
        col,
        268,
        "Trex Select®",
        "GOOD",
        GOOD,
        "Entry composite. Solid, curveable, WUI-compliant. Winchester Grey, Woodland Brown, and Madeira are no longer listed.",
        [
            ("Whiskey Barrel", "#6B4A32"),
            ("Malted Barley", "#C4B08A"),
            ("Millstone", "#7A7A76"),
            ("Pebble Grey", "#9A9A94"),
            ("Saddle", "#A67B4B"),
        ],
        "https://www.trex.com/products/decking/select/",
        "35-year limited residential fade & stain. Newest colors use SunComfortable™ heat-mitigating technology.",
        2,
        img="select.jpg",
        photo_h=96,
    )
    collection_block(
        c,
        right,
        top,
        col,
        268,
        "Trex Transcend®",
        "BETTER",
        BETTER,
        "Premium tropical and earth-tone grain. Not Best in our pricing — Transcend is a Better package.",
        [
            ("Island Mist", "#8A8B86"),
            ("Tiki Torch", "#A67C52"),
            ("Havana Gold", "#B8894A"),
            ("Spiced Rum", "#5C3A2E"),
            ("Lava Rock", "#6B2C2C"),
            ("Rope Swing", "#C4B49A"),
        ],
        "https://www.trex.com/products/decking/transcend/",
        "50-year limited residential fade & stain. WUI-compliant. Darker colors run hotter in full sun.",
        3,
        img="transcend.jpg",
        photo_h=96,
    )
    collection_block(
        c,
        left,
        top - 280,
        col * 2 + gap,
        248,
        "Trex Transcend® Lineage®",
        "BETTER",
        BETTER,
        "Same Transcend performance with SunComfortable™ technology so boards stay cooler than original Transcend of a similar color. Still Better in our pricing — not Best.",
        [
            ("Island Mist", "#8A8B86"),
            ("Rainier", "#A8B0B3"),
            ("Carmel", "#C4B08A"),
            ("Biscayne", "#C4A882"),
            ("Jasper", "#5C4033"),
            ("Salt Flat", "#C5C6C3"),
            ("Hatteras", "#A88868"),
        ],
        "https://www.trex.com/products/decking/lineage/",
        "50-year limited residential. 1x4 profile added in 2026 for mixed-width layouts.",
        img="lineage.jpg",
        photo_h=92,
    )
    footer(c, 4)
    c.showPage()


def page_pvc(c):
    header(c, "TimberTech Advanced PVC", "pvc")
    y = H - 72
    y -= draw_wrapped(
        c,
        "These boards are capped polymer (PVC) with no wood fiber in the board. They will not rot, and they stay cooler and more moisture-resistant than wood-plastic composite. Sold as TimberTech; older marketing still says AZEK. All three collections: Limited Lifetime product warranty + 50-year fade & stain.",
        0.6 * inch,
        y,
        "Sans",
        9.5,
        W - 1.2 * inch,
        color=MUTED,
    )
    gap = 10
    col = (W - 1.2 * inch - 2 * gap) / 3
    top = y - 8
    xs = [0.6 * inch + i * (col + gap) for i in range(3)]
    collection_block(
        c,
        xs[0],
        top,
        col,
        282,
        "Harvest®",
        "BETTER",
        BETTER,
        "Cathedral grain. Class B flame spread, WUI-compliant — not ignition-resistant.",
        [
            ("Slate Gray", "#6E7274"),
            ("Kona", "#3E2A1F"),
            ("Brownstone", "#8B6B4F"),
        ],
        "https://www.timbertech.com/product/azek-harvest-collection/",
        "Three current colors. Matching fascia and risers.",
        2,
        img="harvest.jpg",
        photo_h=86,
    )
    collection_block(
        c,
        xs[1],
        top,
        col,
        282,
        "Vintage®",
        "BEST",
        BEST,
        "Wire-brushed hardwood look. Class A, ignition-resistant, WUI.",
        [
            ("Weathered Teak", "#B8956A"),
            ("Cypress", "#8B5A2B"),
            ("Coastline", "#8A8E90"),
            ("Mahogany", "#6B3A2A"),
            ("English Walnut", "#5C4033"),
            ("Dark Hickory", "#3D2B1F"),
        ],
        "https://www.timbertech.com/product/azek-vintage-collection/",
        "Six colors. Multi-width boards.",
        2,
        img="vintage.jpg",
        photo_h=86,
    )
    collection_block(
        c,
        xs[2],
        top,
        col,
        282,
        "Landmark®",
        "BEST",
        BEST,
        "Crosscut oak/walnut look, matte. Class A, ignition-resistant, WUI.",
        [
            ("French White Oak", "#C4B8A0"),
            ("American Walnut", "#5C4332"),
            ("Castle Gate", "#5A5A58"),
            ("Boardwalk", "#D4C4A8"),
        ],
        "https://www.timbertech.com/product/azek-landmark-collection/",
        "Four colors. Matching cladding in the same hues.",
        2,
        img="landmark.jpg",
        photo_h=86,
    )
    y = top - 294
    card(c, 0.6 * inch, 52, W - 1.2 * inch, y - 60)
    c.setFont("SansBold", 10)
    c.setFillColor(INK)
    c.drawString(0.75 * inch, y - 28, "How to read the warranty line")
    notes = [
        "Trex Select is 35-year limited residential. Trex Transcend and Lineage are 50-year. Transcend is a Better package in our pricing, not Best.",
        "Harvest, Vintage, and Landmark are Advanced PVC: limited lifetime product warranty plus 50-year fade & stain. Harvest is Better; Vintage and Landmark are Best.",
        "Terrain and Legacy are capped composite: 30-year product and fade & stain — not 50 years, and not fire-zone boards.",
        "Swatches are approximate. Order a manufacturer sample and look at it in your yard before you lock a color.",
    ]
    yy = y - 46
    for note in notes:
        c.setFillColor(GOLD)
        c.circle(0.82 * inch, yy + 3, 1.5, fill=1, stroke=0)
        h = draw_wrapped(c, note, 0.95 * inch, yy, "Sans", 8.2, W - 1.8 * inch, leading=11, color=INK)
        yy -= h + 6
    footer(c, 5)
    c.showPage()


def page_composite(c):
    header(c, "TimberTech composite", "composite")
    y = H - 72
    y -= draw_wrapped(
        c,
        "Capped composite: a recycled wood-and-polymer core with a four-sided polymer cap (no wood fiber in the cap). 30-year product and fade & stain limited warranties — not 50 years. Not ignition-resistant; not the pick for a fire-zone lot.",
        0.6 * inch,
        y,
        "Sans",
        9.5,
        W - 1.2 * inch,
        color=MUTED,
    )
    gap = 12
    col = (W - 1.2 * inch - gap) / 2
    top = y - 8
    collection_block(
        c,
        0.6 * inch,
        top,
        col,
        270,
        "Terrain®",
        "BETTER",
        BETTER,
        "Rugged cathedral grain. Sandy Birch, Stone Ash, and Rustic Elm left Terrain (now Terrain+).",
        [
            ("Brown Oak", "#7A5C3A"),
            ("Silver Maple", "#8B9094"),
        ],
        "https://www.timbertech.com/product/pro-terrain-collection/",
        "30-year product + fade & stain. Class C flame spread. Not WUI.",
        img="terrain.jpg",
        photo_h=96,
    )
    collection_block(
        c,
        0.6 * inch + col + gap,
        top,
        col,
        270,
        "Legacy®",
        "BEST",
        BEST,
        "Hand-scraped, board-to-board variation. Best composite when you want a craftsman look without PVC.",
        [
            ("Whitewash Cedar", "#C9B99A"),
            ("Ashwood", "#8A8478"),
            ("Pecan", "#8B6B42"),
            ("Tigerwood", "#A07040"),
            ("Mocha", "#5C4033"),
            ("Espresso", "#2C1A12"),
        ],
        "https://www.timbertech.com/product/pro-legacy-collection/",
        "Six current colors. 30-year product + fade & stain. Class C — not a fire-zone board.",
        3,
        img="legacy.jpg",
        photo_h=96,
    )
    y = top - 282
    card(c, 0.6 * inch, 52, W - 1.2 * inch, y - 60)
    c.setFillColor(INK)
    c.setFont("SansBold", 10)
    c.drawString(0.75 * inch, y - 28, "Composite vs. PVC, in plain language")
    bits = [
        "PVC (Harvest / Vintage / Landmark): no wood in the board, strongest moisture story, lifetime + 50-year fade & stain, Vintage/Landmark are Class A fire-zone boards.",
        "Composite (Terrain / Legacy): wood-fiber core under a polymer cap, 30-year coverage, more traditional composite feel, not for fire-zone lots.",
        "Trex Select / Transcend / Lineage: wood-plastic composite with a protective shell. Select 35-year; Transcend and Lineage 50-year. WUI-compliant.",
        "Pressure treated: real wood. Cheapest. You own the stain schedule.",
    ]
    yy = y - 46
    for bit in bits:
        c.setFillColor(GOLD)
        c.circle(0.82 * inch, yy + 3, 1.5, fill=1, stroke=0)
        h = draw_wrapped(c, bit, 0.95 * inch, yy, "Sans", 8.2, W - 1.8 * inch, leading=11, color=INK)
        yy -= h + 6
    footer(c, 6)
    c.showPage()


def page_rail(c):
    header(c, "Railing", "railing")
    y = H - 72
    y -= draw_wrapped(
        c,
        "The old guide mixed up Trex railing labels and links. This page matches each rail to the package we actually bid. Glass and custom cable are always a separate quote.",
        0.6 * inch,
        y,
        "Sans",
        9.5,
        W - 1.2 * inch,
        color=MUTED,
    )
    rails = [
        ("GOOD", GOOD, "Titan Pro® vinyl", "White vinyl over structural steel posts. Hidden fasteners. Transferable limited lifetime (residential).", "https://rdirail.com/products/titan-pro-rail/", "rail_titan.jpg"),
        ("GOOD", GOOD, "Trex Select® / Enhance®", "Composite rail that pairs with Select boards. Select railing: 25-year limited residential.", "https://www.trex.com/products/railing/select/", "rail_white_composite.jpg"),
        ("BETTER", BETTER, "Trex Transcend® rail", "Classic composite look. 35-year limited residential in most U.S. states (25 in a short list of southern states).", "https://www.trex.com/products/railing/transcend/", "rail_transcend.jpg"),
        ("BETTER", BETTER, "RadianceRail Express®", "Value composite rail in White, Black, and Kona. 25-year limited product warranty.", "https://www.timbertech.com/product/radiancerail-express/", "rail_azek_traditional.jpg"),
        ("BETTER / BEST", BEST, "Trex Signature® aluminum", "Slim aluminum, mesh, or X-Series cable. 50-year limited residential. Cable infill is a Best upgrade.", "https://www.trex.com/products/railing/signature/", "rail_signature.jpg"),
        ("BEST", BEST, "TimberTech / AZEK + cable", "Classic Composite, Impression Rail Express, or glass/cable. Glass always extra.", "https://www.timbertech.com/products/railing/railing-overview/", "rail_azek_detail.jpg"),
    ]
    col_w = (W - 1.2 * inch - 10) / 2
    start_y = y - 6
    row_h = 168
    for i, (pkg, color, title, body, url, img) in enumerate(rails):
        col = i % 2
        row = i // 2
        x = 0.6 * inch + col * (col_w + 10)
        yy = start_y - row * row_h
        card(c, x, yy - 156, col_w, 156, url=url)
        photo(c, photo_path(img), x + 1, yy - 155, 128, 154, radius=7)
        badge(c, x + 140, yy - 22, pkg, color, 78 if " / " not in pkg else 92)
        title_h = draw_wrapped(c, title, x + 140, yy - 42, "SerifBold", 10, col_w - 154, leading=12, color=INK)
        c.setFillColor(GOLD)
        c.setFont("Sans", 7.5)
        c.drawString(x + 140, yy - 46 - title_h, "Tap card →")
        draw_wrapped(c, body, x + 140, yy - 64 - title_h, "Sans", 7.6, col_w - 154, leading=10.2, color=INK)
    footer(c, 7)
    c.showPage()


def page_close(c):
    header(c, "Add-ons & next steps", "close")
    y = H - 72
    addons = [
        ("Deck lighting", "Riser lights, post-cap lights, and under-rail washes. Official Trex and TimberTech kits so the finish matches the rail. Priced per light plus a ballast/labor base.", "lighting.jpg", "https://www.trex.com/products/deck-lighting/"),
        ("Under-deck drainage", "Turns the space under an elevated deck into a dry room. A sloped membrane dumps into a beam gutter and downspout — and keeps the framing drier.", "underdeck.jpg", None),
        ("Riser & post-cap lights", "Stair risers and post caps for night safety. Same official Trex / TimberTech kits. Joist tape is a small framing add-on we can include too.", "lighting_riser.jpg", "https://www.trex.com/products/deck-lighting/"),
        ("Custom rail / glass", "Cable, glass, and drink-rail details are quoted as add-ons. They are not inside the Good / Better / Best board packages.", "rail_azek_glass.jpg", "https://www.timbertech.com/products/railing/railing-overview/"),
    ]
    col_w = (W - 1.2 * inch - 10) / 2
    for i, (title, body, img, url) in enumerate(addons):
        x = 0.6 * inch + (i % 2) * (col_w + 10)
        yy = y - (i // 2) * 168
        card(c, x, yy - 156, col_w, 156, url=url)
        photo(c, photo_path(img), x + 1, yy - 155, 132, 154, radius=7)
        title_h = draw_wrapped(c, title, x + 146, yy - 22, "SansBold", 10, col_w - 160, leading=12, color=GOLD)
        draw_wrapped(c, body, x + 146, yy - 28 - title_h, "Sans", 8, col_w - 160, leading=11, color=INK)
    y = y - 348
    card(c, 0.6 * inch, y - 150, W - 1.2 * inch, 150, fill=NAVY, stroke=NAVY)
    c.setFillColor(GOLD)
    c.setFont("SansBold", 9)
    c.drawString(0.8 * inch, y - 24, "WHEN YOU ARE READY")
    c.setFillColor(white)
    c.setFont("SerifBold", 14)
    c.drawString(0.8 * inch, y - 46, "Pick a package. We lock colors in writing, then build.")
    steps = [
        "1. Walk the boards in this guide and order manufacturer samples.",
        "2. Tell us PT / Good / Better / Best plus any lighting or drainage add-on.",
        "3. We confirm SKUs, send the agreement, and schedule after permits.",
    ]
    yy = y - 70
    for step in steps:
        c.setFillColor(HexColor("#E7E5E4"))
        c.setFont("Sans", 9)
        c.drawString(0.8 * inch, yy, step)
        yy -= 16
    y = y - 168
    c.setFillColor(MUTED)
    c.setFont("Sans", 7.4)
    legal = (
        "Sources checked August 2026 against Trex, TimberTech, and RDI published product pages and limited-warranty tables. "
        "Warranties are the manufacturers’ current limited residential terms and are not a substitute for the full warranty document. "
        "Labor/workmanship is covered only by Elevated Decks’ package term (3 years PT/Good/Better, 5 years Best). "
        "Colors, profiles, and local stock change. We do not guarantee a color until it is written on your agreement. "
        "Trex, Transcend, Lineage, Select, Enhance, Signature, and related marks are trademarks of Trex Company, Inc. "
        "TimberTech, AZEK, Harvest, Vintage, Landmark, Terrain, Legacy, RadianceRail, and related marks are trademarks of their owners. "
        "Titan Pro is a trademark of RDI / Barrette Outdoor Living."
    )
    draw_wrapped(c, legal, 0.6 * inch, y, "Sans", 7.2, W - 1.2 * inch, leading=9.6, color=MUTED)
    footer(c, 8)
    c.showPage()


def main():
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    c = canvas.Canvas(OUT, pagesize=letter)
    c.setTitle("Elevated Decks Material Selection Guide 2026")
    c.setAuthor("Elevated Decks")
    c.setSubject("PT / Good / Better / Best deck packages — fact-checked August 2026")
    cover(c)
    page_overview(c)
    page_packages(c)
    page_trex(c)
    page_pvc(c)
    page_composite(c)
    page_rail(c)
    page_close(c)
    c.save()

    copies = [
        os.path.join(ROOT, "package-options.pdf"),
        os.path.join(ROOT, "public", "package-options", "elevated-decks-package-options-guide.pdf"),
        "/home/dbsu33/projects/package-options.pdf",
    ]
    for dest in copies:
        os.makedirs(os.path.dirname(dest) or ".", exist_ok=True)
        shutil.copy2(OUT, dest)
        print("wrote", dest)
    print("primary", OUT)


if __name__ == "__main__":
    main()
