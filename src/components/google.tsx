/*
 * Copyright (c) 2023 riyuzenn <riyuzenn@gmail.com>
 * See the license file for more info
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

import * as React from "react"
import Svg, { Defs, Path, ClipPath, Use } from "react-native-svg"

export default function Google() {
    return (
  <Svg
    height={24}
    width={24}
    viewBox="0 0 32 32"

  >
    <Defs>
      <Path
        id="a"
        d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
      />
    </Defs>
    <ClipPath id="b">
      <Use xlinkHref="#a" />
    </ClipPath>
    <Path
      fill="#fbbc05"
      d="M0 37V11l17 13z"
      clipPath="url(#b)"
      transform="matrix(.72727 0 0 .72727 -.955 -1.455)"
    />
    <Path
      fill="#ea4335"
      d="m0 11 17 13 7-6.1L48 14V0H0z"
      clipPath="url(#b)"
      transform="matrix(.72727 0 0 .72727 -.955 -1.455)"
    />
    <Path
      fill="#34a853"
      d="m0 37 30-23 7.9 1L48 0v48H0z"
      clipPath="url(#b)"
      transform="matrix(.72727 0 0 .72727 -.955 -1.455)"
    />
    <Path
      fill="#4285f4"
      d="M48 48 17 24l-4-3 35-10z"
      clipPath="url(#b)"
      transform="matrix(.72727 0 0 .72727 -.955 -1.455)"
    />
  </Svg>
    )
}

