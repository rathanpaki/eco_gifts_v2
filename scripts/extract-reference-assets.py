from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parents[2]
SOURCE = ROOT / "ui" / "Archive — EcoGifts Hybrid Desktop.png"
OUTPUT = ROOT / "eco_gifts" / "public" / "images"

CROPS = {
    "landing-hero.jpg": (0, 109, 1440, 758),
    "weddings.jpg": (70, 940, 950, 1485),
    "birthdays.jpg": (971, 940, 1368, 1205),
    "corporate.jpg": (971, 1218, 1368, 1485),
    "personalization-preview.jpg": (730, 2660, 1252, 3190),
}


def main() -> None:
    OUTPUT.mkdir(parents=True, exist_ok=True)
    with Image.open(SOURCE) as image:
        rgb = image.convert("RGB")
        for name, box in CROPS.items():
            rgb.crop(box).save(OUTPUT / name, quality=92, optimize=True)


if __name__ == "__main__":
    main()
