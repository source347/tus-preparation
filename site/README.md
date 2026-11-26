# TUS Kartları — web uygulaması

Bu klasör GitHub Pages üzerinden yayımlanan statik çalışma arayüzünü içerir.

## Katalog (26 Kasım 2026)

132 deste ve 2,102 kart içerir. Klinik bilimler içinde Dahiliye: 22 deste, 437 kart; Pediatri: 18 deste, 180 kart; Genel Cerrahi: 9 deste, 108 kart; Kadın Hastalıkları ve Doğum: 8 deste, 96 kart.

## Özellikler
- Kart çevirme, önceki/sonraki kart ve konu seçimi
- Soru, yanıt ve açıklamalarda arama
- Kartları **Öğrendim** veya **Tekrar et** olarak işaretleme
- İlerlemenin tarayıcının `localStorage` alanında saklanması
- İlerlemeyi JSON olarak dışa aktarma ve içe aktarma
- Klavye kısayolları: ← / →, Space, 1, 2

## Veri ve gizlilik
İlerleme bilgisi sunucuya gönderilmez. Tarayıcı verileri temizlenirse kaybolabilir; düzenli olarak JSON yedeği alın. Dışa aktarma dosyası kart metinlerini değil, kart durumlarını ve zaman damgalarını içerir.

## Kart ekleme
Yeni desteleri `data/cards.json` içindeki `decks` dizisine ekleyin. Her kartın benzersiz bir `id`, `question`, `answer` ve isteğe bağlı `explanation` alanı olmalıdır. Kaynakları ana depodaki konu Markdown dosyalarında ayrıntılı biçimde belgeleyin.
