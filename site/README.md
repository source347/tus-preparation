# TUS Kartları — web uygulaması

Bu klasör GitHub Pages üzerinden yayımlanan statik çalışma arayüzünü içerir.

## Katalog (26 Kasım 2026)

132 deste ve 2,102 kart içerir. Klinik bilimler içinde Dahiliye: 22 deste, 437 kart; Pediatri: 18 deste, 180 kart; Genel Cerrahi: 9 deste, 108 kart; Kadın Hastalıkları ve Doğum: 8 deste, 96 kart.

## Özellikler
- Ders gruplarına göre filtrelenen, aramalı konu tarayıcısı; uzun bir açılır liste yerine konu kartları
- Kart çevirme, önceki/sonraki kart, soru/yanıt/açıklama araması ve kartları karıştırma
- **Öğrendim**, **Tekrar et** ve yıldızlı kart işaretleri; yeni, tekrar, öğrenilen ve yıldızlı filtreleri
- Otomatik çalışma: soruyu gösterme, yanıtı açma ve sonraki karta geçme; isteğe bağlı döngü
- Sabit soru/yanıt süreleri veya kelime sayısı ve hedef kelime/dakika üzerinden dinamik süre hesabı
- Tarayıcı/işletim sisteminin yerleşik konuşma motoruyla soru ve yanıtları sesli okuma; mevcut ses, dil ve hız seçenekleri
- Kart ön/arka yüzü ve vurgu rengi ayarları
- Ayarların ve ilerlemenin tarayıcının `localStorage` alanında saklanması
- İlerlemeyi JSON olarak dışa aktarma ve içe aktarma
- Klavye kısayolları: ← / →, Space, 1, 2, P

## Veri ve gizlilik
İlerleme bilgisi sunucuya gönderilmez. Tarayıcı verileri temizlenirse kaybolabilir; düzenli olarak JSON yedeği alın. Dışa aktarma dosyası kart metinlerini değil, kart durumlarını ve zaman damgalarını içerir.

## Kart ekleme
Yeni desteleri `data/cards.json` içindeki `decks` dizisine ekleyin. Her kartın benzersiz bir `id`, `question`, `answer` ve isteğe bağlı `explanation` alanı olmalıdır. Kaynakları ana depodaki konu Markdown dosyalarında ayrıntılı biçimde belgeleyin.
