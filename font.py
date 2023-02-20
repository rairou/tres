
# Rename all font files in the assets/font/ dir

import pathlib
import os
p = "./assets/fonts/"
for f in pathlib.Path(p).glob("**/*"):
    x =  str(".\\" + str(f)).replace("-", "_").lower()
    os.rename(f, x)