# TUS Hazırlık

Tıpta Uzmanlık Eğitimi Giriş Sınavı'na (TUS) hazırlanan adaylar için açık, topluluk katkısına dayalı, yüksek verimli flash kart arşivi.

**[Çalışma uygulamasını aç](https://source347.github.io/tus-preparation/)** · **[Katkı rehberi](CONTRIBUTING.md)** · **[Kaynak ve kanıt standartları](SOURCES.md)**

## Kapsam

Bu depo öncelikle **flash kartlara** odaklanır; genel amaçlı soru bankası, deneme sınavı veya çevrim içi kurs platformu değildir. Amaç, güvenilir tıbbi bilgiyi TUS konu dağılımına göre düzenlenmiş, öz ve etkili kartlara dönüştürmektir.

## Üretim standardı

- Planlama hesabı: **TUS'taki her bir soru için yaklaşık 10 flash kart.**
- Teslim partisi: **30 kart**; yaklaşık **3 TUS sorusuna** karşılık gelir.
- Bu sayılar hedef hacmi belirler; kaliteyi düşürmek için kota değildir. Konu gerektiriyorsa daha az kart hazırlanabilir. Tekrarlı veya düşük verimli kartlarla sayı tamamlanmaz.

## Organizasyon

- Temel bilimler: Anatomi, Histoloji ve Embriyoloji, Fizyoloji, Tıbbi Biyokimya, Tıbbi Mikrobiyoloji, Tıbbi Patoloji, Tıbbi Farmakoloji
- Klinik bilimler: Dahiliye, Pediatri, Genel Cerrahi, Kadın Hastalıkları ve Doğum

Her dersin altında konu bazlı kart dosyaları bulunur.

## Kart ilkeleri

1. **Yüksek verim:** Sık sınanan, klinik açıdan önemli ve ayırt ettirici bilgileri önceliklendir.
2. **Tek öğrenme hedefi:** Her kart tek ve net bir kavramı sınasın.
3. **Kesinlik:** Soru açık, yanıt doğru ve gerekli nitelemeleri içerir olsun.
4. **Kullanışlılık:** Gerektiğinde mekanizma, ayırıcı özellik, klinik ilişki ve sınav tuzağı ekle.
5. **Kanıta dayalı yaklaşım:** Kaynakları belirt, iddiaları doğrula.
6. **Özgün anlatım:** Telifli soru bankalarından, ücretli kaynaklardan veya kitaplardan metin kopyalama.

## Web uygulaması

GitHub Pages uygulaması kartları tarayıcıda çalıştırır. Kart ilerlemesi `localStorage` içinde yerel olarak saklanır; JSON dosyası olarak dışa aktarılıp başka tarayıcıya aktarılabilir. Ayrıntılar için [site/README.md](site/README.md) dosyasına bakın.

## Katkı

Kart eklemeden önce [CONTRIBUTING.md](CONTRIBUTING.md) ve [SOURCES.md](SOURCES.md) belgelerini okuyun. İçerik Türkçe hazırlanır; uluslararası kabul gören Latince/İngilizce anatomik ve tıbbi terimler gerektiğinde parantez içinde korunabilir.
