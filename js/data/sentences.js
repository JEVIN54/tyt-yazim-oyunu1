// %100 TDK Uyumlu Genişletilmiş Cümle İçi Yazım Yanlışı Avı Soru Havuzu (Oyun 2)
export const SENTENCE_QUESTIONS = [
  {
    id: 1,
    sentence: "Toplantıda herşeyin yolunda olduğunu söyleyerek hepimizi rahatlattı.",
    wrongWord: "herşeyin",
    correctWord: "her şeyin",
    options: ["Toplantıda", "herşeyin", "olduğunu", "rahatlattı"],
    correctIndex: 1,
    explanation: "TDK kuralına göre 'şey' sözcüğü her zaman ayrı yazılır: 'Her şeyin'."
  },
  {
    id: 2,
    sentence: "Yeni aldığı orijinal tablonu salonun en güzel köşesine astı.",
    wrongWord: "Yok (Tüm kelimeler doğru)",
    correctWord: "Orijinal (Doğru yazılmış)",
    options: ["orijinal", "tablonu", "köşesine", "Yanlış yok"],
    correctIndex: 3,
    explanation: "'Orijinal' kelimesi TDK'ye göre ortada 'i' ile tam doğru yazılmıştır. Cümlede yazım yanlışı yoktur!"
  },
  {
    id: 3,
    sentence: "Sende bizimle kütüphaneye gelip ders çalışmak ister misin?",
    wrongWord: "Sende",
    correctWord: "Sen de",
    options: ["Sende", "kütüphaneye", "ders", "ister misin"],
    correctIndex: 0,
    explanation: "Cümleden çıkarıldığında anlam bozulmuyorsa 'de' bağlaçtır ve ayrı yazılır: 'Sen de'."
  },
  {
    id: 4,
    sentence: "Yarın ki sınav için gece geç saatlere kadar not çıkardı.",
    wrongWord: "Yarın ki",
    correctWord: "Yarınki",
    options: ["Yarın ki", "sınav", "saatlere", "çıkardı"],
    correctIndex: 0,
    explanation: "Zaman bildiren sözcüklere gelen ek olan '-ki' aitlik/sıfat türeten ektir ve bitişik yazılır: 'Yarınki'."
  },
  {
    id: 5,
    sentence: "Türk Dil Kurumu'nun yeni binası Ankara'da hizmete açıldı.",
    wrongWord: "Kurumu'nun",
    correctWord: "Kurumunun",
    options: ["Türk", "Kurumu'nun", "Ankara'da", "hizmete"],
    correctIndex: 1,
    explanation: "TDK kuralı: Kurum, kuruluş, kurul ve iş yeri adlarına gelen ekler kesme işaretiyle ( ' ) ayrılmaz! (Türk Dil Kurumunun)"
  },
  {
    id: 6,
    sentence: "Doğu Anadolu'nun kuzeyi bu akşam kar yağışlı geçecek.",
    wrongWord: "Yok",
    correctWord: "Doğu (Doğru)",
    options: ["Doğu", "Anadolu'nun", "kuzeyi", "Yanlış yok"],
    correctIndex: 3,
    explanation: "Yön isimleri özel isimden ÖNCE gelirse büyük (Doğu Anadolu), SONRA gelirse küçük (kuzeyi) yazılır. Cümle tamamen doğrudur!"
  },
  {
    id: 7,
    sentence: "Avukat Mustafa bey, davanın son durumunu müvekkiline aktardı.",
    wrongWord: "bey",
    correctWord: "Bey",
    options: ["Avukat", "Mustafa", "bey", "müvekkiline"],
    correctIndex: 2,
    explanation: "Kişi adlarından sonra gelen unvanlar, saygı sözleri büyük harfle başlar: 'Mustafa Bey'."
  },
  {
    id: 8,
    sentence: "Oysaki o her zaman bize dürüst davranacağını söylemişti.",
    wrongWord: "Yok",
    correctWord: "Oysaki (Doğru)",
    options: ["Oysaki", "her zaman", "dürüst", "Yanlış yok"],
    correctIndex: 3,
    explanation: "SIMBOHÇAM kuralı gereği 'Oysaki' bağlacı kalıplaştığı için bitişik yazılır. Cümle doğrudur!"
  },
  {
    id: 9,
    sentence: "İki arkadaş sınav stresini atmak için hafta sonu pikniğe gitti.",
    wrongWord: "Yok",
    correctWord: "Hafta sonu (Doğru)",
    options: ["arkadaş", "hafta sonu", "pikniğe", "Yanlış yok"],
    correctIndex: 3,
    explanation: "'Hafta sonu' zaman bildiren söz öbeği TDK'ye göre ayrı yazılır. Cümlede yazım hatası yoktur."
  },
  {
    id: 10,
    sentence: "Doktor Unvanı almak için yıllarca gece gündüz demeden çalıştı.",
    wrongWord: "Unvanı",
    correctWord: "unvanı",
    options: ["Doktor", "Unvanı", "yıllarca", "çalıştı"],
    correctIndex: 1,
    explanation: "Özel ad olmayan veya cümle ortasında cins isim olarak kullanılan 'unvanı' küçük harfle başlar."
  },
  {
    id: 11,
    sentence: "Yurt dışından gelen misafirler için özel bir karşılama töreni düzenlendi.",
    wrongWord: "Yok",
    correctWord: "Yurt dışından (Doğru)",
    options: ["Yurt dışından", "misafirler", "töreni", "Yanlış yok"],
    correctIndex: 3,
    explanation: "İç, dış, sıra sözleriyle kurulan birleşikler ayrı yazılır. 'Yurt dışından' kullanımı tam doğru olup yanlış yoktur!"
  },
  {
    id: 12,
    sentence: "Olay yerinde suç üstü yakalanan şüpheli ifadeleri alınmak üzere karakola götürüldü.",
    wrongWord: "suç üstü",
    correctWord: "suçüstü",
    options: ["yerinde", "suç üstü", "şüpheli", "karakola"],
    correctIndex: 1,
    explanation: "Somut bir yer bildirmeyen alt, üst ve üzeri sözcükleri bitişik yazılır: 'Suçüstü'."
  },
  {
    id: 13,
    sentence: "Rehber öğretmenimiz bize derece yapmak için bir takım tavsiyelerde bulundu.",
    wrongWord: "bir takım",
    correctWord: "birtakım",
    options: ["öğretmenimiz", "derece", "bir takım", "tavsiyelerde"],
    correctIndex: 2,
    explanation: "'Bazı' anlamında kullanılan belgisiz sıfat 'birtakım' bitişik yazılmalıdır."
  },
  {
    id: 14,
    sentence: "Rastgele seçilen sorularla kendimizi deneme sınavına tabi tuttuk.",
    wrongWord: "Yok",
    correctWord: "Rastgele (Doğru)",
    options: ["Rastgele", "sorularla", "deneme", "Yanlış yok"],
    correctIndex: 3,
    explanation: "'Rastgele' kalıplaşmış kelimesi 't' harfi ile bitişik yazılır. Cümle tamamen doğrudur!"
  },
  {
    id: 15,
    sentence: "Vali Ahmet bey ildeki eğitim yatırımlarını yakından takip ediyor.",
    wrongWord: "bey",
    correctWord: "Bey",
    options: ["Vali", "Ahmet", "bey", "eğitim"],
    correctIndex: 2,
    explanation: "Özel isme bağlı unvan ve saygı kelimeleri büyük harfle başlar: 'Ahmet Bey'."
  }
];
