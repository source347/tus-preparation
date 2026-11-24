# TUS Hazırlık

Tıpta Uzmanlık Eğitimi Giriş Sınavı'na (TUS) hazırlanan adaylar için açık, topluluk katkısına dayalı, yüksek verimli flash kart arşivi.

**[Çalışma uygulamasını aç](https://source347.github.io/tus-preparation/)** · **[Katkı rehberi](CONTRIBUTING.md)** · **[Kaynak ve kanıt standartları](SOURCES.md)**

## Kapsam

Bu depo öncelikle **flash kartlara** odaklanır; genel amaçlı soru bankası, deneme sınavı veya çevrim içi kurs platformu değildir. Amaç, güvenilir tıbbi bilgiyi TUS'ta seçenek eleme ve doğru yanıtı tanımayı destekleyecek biçimde düzenlemektir.

## Üretim standardı

- **Yüksek verim:** sık sınanan, klinik açıdan anlamlı ve seçenekleri birbirinden ayıran bilgileri önceliklendir.
- **Karar odaklı kart:** her kart öğrencinin bir veya daha fazla çeldiriciyi elemesine ya da doğru seçeneği tanımasına yardım etmelidir.
- **Kota yok:** kart sayısı konu başına önceden belirlenmez; gereksiz kartla sayı tamamlanmaz.
- **Kesin üst sınır:** ilgili TUS soru başına en fazla **20 kart**. Bu bir hedef değildir; ihtiyaç daha azsa daha az kart hazırlanır.
- **Kapsamı değil başarıyı optimize et:** düşük verimli ayrıntılar, nadir istisnalar ve tekrarlar sırf konu başlığı boş kalmasın diye eklenmez.

## Organizasyon

- Temel bilimler: Anatomi, Histoloji ve Embriyoloji, Fizyoloji, Tıbbi Biyokimya, Tıbbi Mikrobiyoloji, Tıbbi Patoloji, Tıbbi Farmakoloji
- Klinik bilimler: Dahiliye, Pediatri, Genel Cerrahi, Kadın Hastalıkları ve Doğum

## Kart ilkeleri

1. **Ayırt ettiricilik:** enzim, klinik bulgu, mekanizma veya tipik eşleştirmeyle seçenek elemesini destekle.
2. **Tek öğrenme hedefi:** her kart tek ve net bir kavramı sınasın.
3. **Kesinlik:** soru açık, yanıt doğru ve gerekli nitelemeleri içerir olsun.
4. **Kısa açıklama:** yalnızca doğru seçeneği ayırt etmeye yarayan mekanizma veya sınav tuzağını ekle.
5. **Kanıta dayalı yaklaşım:** kaynakları belirt, iddiaları doğrula.
6. **Özgün anlatım:** telifli soru bankalarından, ücretli kaynaklardan veya kitaplardan metin kopyalama.

## Web uygulaması

GitHub Pages uygulaması kartları tarayıcıda çalıştırır. Kart ilerlemesi `localStorage` içinde yerel olarak saklanır; JSON dosyası olarak dışa aktarılıp başka tarayıcıya aktarılabilir. Ayrıntılar için [site/README.md](site/README.md) dosyasına bakın.

## Katkı

Katkı öncesinde [CONTRIBUTING.md](CONTRIBUTING.md) ve [SOURCES.md](SOURCES.md) belgelerini okuyun. İçerik Türkçe hazırlanır; uluslararası kabul gören terimler gerektiğinde parantez içinde korunabilir.
