#!/bin/bash

# Array de URLs de imágenes
declare -a urls=(
    "https://blogger.googleusercontent.com/img/a/AVvXsEiFQe6Qk9NOUb_Wo2TWoSaQrt7PjJhRZuYHDsA_9Tg-jg0ETtN8nUsfxCt2a-6bdJOPdLSKoACjtwNPfMnI6DWXlrh4bT5jFLFbOy9z3ymdi_6DTd6YuBxwGEBi0KvEH4N1EfEtDIj1_p-6T34OCN9XY5ivGyUq1DQWlVSXhasbuPQtCRDnho5KMtDV8W1Z=s16000"
    "https://blogger.googleusercontent.com/img/a/AVvXsEjSuOA8ZGnJtQn_vmT5_YZWEf6CViva_0_ruXfRGkGecd8zaNZa7HP3736_S5kU966-Yp0RJ6Mhh6CXV1gdavhokkfTHo7-siH1iIOZaUk1EKNF7stocD3V0F9SmVlpFFyXyqFs2RaL_Pe2EhMDKjTzxaAmTGNofZ0NFmtJTm1V7L21P2yi1bDPWl5B3AWN=s16000"
    "https://blogger.googleusercontent.com/img/a/AVvXsEheagcihj2ErCrGGTiR8telclOWAD3yEIJ-cJR3trTXm5bo0wSRp7p3ZS1yMrjTDE2iyw1uVJ7RwFPmj5rXMiEsODako0pMjKayhEYxLbhvIdQrNy_fZyxhXNZug9BePOGw1gvMOHq8iJtWian4iIq24zeIj2TIA9CqUVMBBmyoUeg2PxmtKvTtz3RXfw=s16000"
    "https://blogger.googleusercontent.com/img/a/AVvXsEj56WUa-_fJ8QxnPbrtdV52htvY4MAZy6u1eMm7pvyGeBM85lTtOFEFeDgaCyVEg8BgMyABGCLjih_KP6lixJg4f4yYXaICSvHVCOQU9XDP9YZzJLF1SCBGa4oo-4IeSPSdjitmHy6qqJKwMaHbUfM8wCuL0pCtZ9YZ1TMMTOqspsB5vRGSyw7bLXYf=w400-h80"
    "https://blogger.googleusercontent.com/img/a/AVvXsEgafgfXS6G91xMOorVMfXBj7irB-BOVv6sgwKJYzihBGfARFNvMXJZNvwhxRe6q8_8RkEnG8WTosQomWPx9PI3i1HpiQZ7LURLXroRyCB7pFoAnlt_h_mJ4zNUdbpZEv3QDifQbqT2VhkBEplHpqyLlTHiPkC4TaulR29bdMZTmCZV4_jO-V5pOooib=s16000"
    "https://blogger.googleusercontent.com/img/a/AVvXsEiGRktW7ozwOeTPIgn3PCNkHz1P_IFuLIUXxUm8gkB68Ne5qBNBj79NccpSee6UraewUz1vgVPHfm0MZy5y4fyz_hKSx2qGMIifvj8iRjmeplWvp1YEl22mr-z_sDaEDhIvqxvBJZfw4qhQAuvMtJEbY4ZK-R7EfBNvVyVBccNjLD_UiOkBg52iizp9hA=w400-h400"
    "https://blogger.googleusercontent.com/img/a/AVvXsEiGukwTomxxWB3rhi14QxVwEvIr9XulhaIKKN_KYd03MHZudSCv102EelPJ_zYkqZ-VSEl0t-VeJHXel44v2QxocVLCsTnn8HCevHi4gfwIqTSDjakFqc9ui6k9ev_HO0Hfzy4dlzwtGhp3bVXe4FjlC7JiCpL6xAmFKvPoqTrdw_KF3MvKPxqrxBdE=s16000"
    "https://blogger.googleusercontent.com/img/a/AVvXsEh2RLHOk8JSRio9hzVI7Ryc3rGj5yMDgV5n6s7Ixo__nN3HNE2_-QHolkfpSQclFbsdPLkjG7rWp1jIH-OTNIbIXpgn236xIkLV6i0XGakfPKJBv3FWXlKuQV-Y4WBqR84lFCy5vLdEJgoYsvKK5gNIR6lZH3k3pcNpNnXrAY_drC_HvLRoLHMSWFjU=s16000"
    "https://blogger.googleusercontent.com/img/a/AVvXsEgEZ1Czgl9BMF-P-n_0fVq0tbpUP7A3ADoawrq-MZ3Q5NBVR-Z9atMq9X9Rpnb3LTtY40XOi8T6Qmi3OqJ7DEI2K48HMeS1iEys_rWlcvtS4hleuOf1Nbnlxb6aPYT4yP8AEeqXgtXDCRsQCFAZojMi-HJhfwyXCgGbsxsZ0D5mtb-lY2y5iZukN3lvqA=s16000"
    "https://blogger.googleusercontent.com/img/a/AVvXsEi9_lMez3g682nAC91AeBCOeQQycU46mesQXTX9p7Df0viAq6DHmnTaxnwFQHyU-K4GyBzUjGJ27FkbeAs2BEyoyWrUQMx9rPQdBd2GDVjRT9hxRHEaxOKJIoHdV9zTQ3vx7q9Wsm-LiwXJqH58ToAfmUAnPOqFzW9TB5hdWwWqDHCEL4Lvo1QQ1sLY=s16000"
    "https://blogger.googleusercontent.com/img/a/AVvXsEjR19tQibeyTsUMNL14dMpwkUpL3Loo34lpOela-sxXL6uucM9qyf3vBViwYRtIJdFZ2xhOP_UC-3dQxJNW9I7eoF5R9RdbynXRGOFH8R-zGSs1EhkXim-b4twQBr67SChY8_ZchbbvEfIAQQRqbmTveuU-AIcCu6PdykMXxSdnvFaF_iyz4sjvj_Jw=s16000"
    "https://blogger.googleusercontent.com/img/a/AVvXsEhcLGlZ8gmVlaS9Cla8xyoulL4ZVB-7FLdQr4kfV8PtgV1JRS5oivYVOFbAJQJvCPI8KSlyIBtVwlwzYiZWfft1uVqArCUFPoXeAyXuSLQD348gnEruCysimCYqDmBRjzM9GykeCQaIeMrMraDhdfDPvo-6_JHNGYXcG4ut1wdSFki64I1YhSGt-rD-=s16000"
    "https://blogger.googleusercontent.com/img/a/AVvXsEhm4yzofX3Jpf1hBB-4lLK9xWHb_lOiujdnKxatWwu43rZ_okzfjJAxn3WTh9TDR1hFisXuqVJdAudVbBTKj7gwsl1zWnfodS7HA1S3vMoxqzBN_vUaU6Q7RuBWgDng_6xBsmopByoDBVmdOw9gRdlAgUwgFdcx03cCFmhz6c7_0uG7PWvlKL1gq8vK=s16000"
    "https://blogger.googleusercontent.com/img/a/AVvXsEi5VDgVWe6UZRWC9VdvtutDDgoauEKHheDjxfcdxSlNufyjioNs5NbRRlu4UhLnezYRUG2EKvOZmB_8OpwXDhFyPbxjfavv2tTWog2mf8JbhkURmkzRC01KWvfoD4XPofrVJHR21Ao-e5idTXE1oGn7iJaXW66JtDdXa_o3ub0oQqSgbsFZ_4gUJ7YHwA=s16000"
    "https://blogger.googleusercontent.com/img/a/AVvXsEiZLTxoIffak-Kn7-q9LWYo02tE9FwjYMUyx9iOQPiRVjHRGMVlVnu8PDEwopCh6mQnDvDdiYQ-vGRDULuvKVcj2w3IZkHNFL9liJlsg8uNq5zrfHXE1z0oXkQ9EjwBlzAM8gcVp9hirvc8alhUIKgnT5beQ3zS-0Pbdfdvr8pcG1U4lZOa_emDakzS=s16000"
)

# Array de nombres de archivos
declare -a filenames=(
    "mystic-image-1"
    "mystic-image-2"
    "arcane-main-visual"
    "arcane-emblem"
    "imagen-anima"
    "testimonial-1"
    "testimonial-2"
    "testimonial-3"
    "brujeria-1"
    "brujeria-2"
    "brujeria-3"
    "brujeria-4"
    "bg-img"
    "main-image"
    "whatsapp-logo"
)

echo "Descargando y convirtiendo imágenes a WebP..."

# Descargar y convertir cada imagen
for i in "${!urls[@]}"; do
    url="${urls[$i]}"
    filename="${filenames[$i]}"
    
    echo "Procesando: $filename"
    
    # Descargar imagen original
    curl -s -o "images/${filename}.jpg" "$url"
    
    # Convertir a WebP con compresión optimizada
    /opt/homebrew/bin/magick "images/${filename}.jpg" -quality 80 -define webp:lossless=false "images/${filename}.webp"
    
    # Eliminar archivo original para ahorrar espacio
    rm "images/${filename}.jpg"
    
    echo "✓ Completado: ${filename}.webp"
done

echo "¡Todas las imágenes han sido descargadas y convertidas a WebP!"