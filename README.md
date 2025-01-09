# G! Tara Na Autochord
Backend for G! Tara Na project

Requires Python 3.11

> [!NOTE]
> Python 3.12 and above does not work with Autochord.

## Raspberry Pi 4
### Install
```sh
sudo apt install libvamp-sdk2v5
mkdir ~/.vamp
cp ./dep/lib/vamp/nnls-chroma.so ~/.vamp
python -m venv env
source env/bin/activate
pip install tensorflow==2.15.0
pip install -r requirements.txt
```

### Run
```sh
source env/bin/activate
python app.py
```

## GitHub Codespaces
### Install
```sh
pip install tensorflow==2.15.0
pip install -r requirements.txt
```

### Run
```sh
python app.py
```

## API Documentation
1. `/api/detect`
   * Method: `POST`
   * POST a WAV file, returns the detected chord.
2. `/api/history`
   * Method: `GET`
   * Returns the chord history in JSON.

## Vamp NNLS Chroma for aarch64

[Source](https://altlinux.pkgs.org/p10/classic-aarch64/vamp-nnls-chroma-0.2.1-alt1.hg2010806.aarch64.rpm.html)