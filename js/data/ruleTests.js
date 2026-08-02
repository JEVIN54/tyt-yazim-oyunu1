// %100 TDK & ÖSYM TYT Formatında Yazım Kuralları Testi (Oyun 3)
// de'nin yazımı, ki'nin yazımı, Özel Adlar, Büyük Harfler, Kurum/Kuruluşlar
export const RULE_TEST_QUESTIONS = [
  {
    id: 1,
    category: "de / da Bağlacı ve Eki",
    question: "Aşağıdaki cümlelerin hangisinde '-de / de' nin yazımı ile ilgili bir YANLIŞLIK yapılmıştır?",
    options: [
      "A) Kütüphanede bulamadığı kitabı sahafçıda aradı.",
      "B) Sende bu akşamki tiyatro gösterisine gelecek misin?",
      "C) Ahmet de bizimle aynı görüşü paylaştığını belirtti.",
      "D) Evde oturup ders çalışmayı tercih etti."
    ],
    answer: 1, // B
    explanation: "B şıkkında 'Sende' sözcüğündeki 'de' cümleden çıkarıldığında anlam bozulmaz ('Sen bu akşamki tiyatroya gelecek misin?'). Bu yüzden bağlaçtır ve ayrı yazılmalıdır: 'Sen de'."
  },
  {
    id: 2,
    category: "ki Bağlacı ve Eki",
    question: "Aşağıdakilerin hangisinde 'ki' nin yazımı DOĞRUDUR?",
    options: [
      "A) Duydumki unutmuşsun gözlerimin rengini.",
      "B) Masada ki dosyaları hemen odama getir.",
      "C) Oysaki sen benim en güvendiğim arkadaşımdın.",
      "D) Demek ki sende beni anlamak istemiyorsun."
    ],
    answer: 2, // C
    explanation: "TDK'de kalıplaşmış 'ki' bağlaçları SIMBOHÇAM (Sanki, İllaki, Meğerki, Belki, Oysaki, Halbuki, Çünkü, Mademki) kelimeleridir ve bitişik yazılır. 'Oysaki' doğrudur. (A: Duydum ki, B: Masadaki olmalı)."
  },
  {
    id: 3,
    category: "Büyük Harfler & Özel Adlar",
    question: "Aşağıdaki cümlelerin hangisinde büyük harflerin kullanımıyla ilgili bir yazım yanlışı vardır?",
    options: [
      "A) Türk Dil Kurumunun kuruluş yıl dönümü kutlandı.",
      "B) Vali Ahmet Bey, ilçemizdeki okul inşaatını denetledi.",
      "C) Bu yaz Kuzey Doğu Anadolu gezisine çıkacağız.",
      "D) Boğaz'dan geçen gemiler dikkatle izleniyor."
    ],
    answer: 2, // C
    explanation: "TDK kuralı: Ara yönler (kuzeydoğu, güneydoğu, kuzeybatı, güneybatı) her zaman bitişik ve küçük yazılır. Birleşik yön adı olarak 'Kuzeydoğu Anadolu' olmalıdır."
  },
  {
    id: 4,
    category: "Kesme İşareti & Kurum Adları",
    question: "Aşağıdaki cümlelerin hangisinde kesme işaretinin (') kullanımı ile ilgili bir HATA yapılmıştır?",
    options: [
      "A) Türkiye Büyük Millet Meclisi'ne yeni bir kanun teklifi sunuldu.",
      "B) 1923'te kurulan Cumhuriyetimiz 100 yaşını geride bıraktı.",
      "C) Yakup Kadri'nin Yaban romanını mutlaka okumalısınız.",
      "D) 15 Mayıs'ta yapılacak sınav için başvurular başladı."
    ],
    answer: 0, // A
    explanation: "TDK kuralı: Kurum, kuruluş, kurul, birleşim, oturum ve iş yeri adlarına gelen ekler kesme işaretiyle ayrılmaz! 'Türkiye Büyük Millet Meclisine' şeklinde kesmesiz yazılmalıdır."
  },
  {
    id: 5,
    category: "Unvanlar ve Makam Adları",
    question: "Aşağıdaki cümlelerin hangisinde unvanların veya makam adlarının yazımı YANLIŞTIR?",
    options: [
      "A) Sayın Bakan, heyeti makamında kabul etti.",
      "B) Mustafa kemal paşa, Kurtuluş Savaşı'nı başlattı.",
      "C) Cumhurbaşkanı, halka hitaben bir konuşma yaptı.",
      "D) Zeynep Hanım, toplantıya zamanında katıldı."
    ],
    answer: 1, // B
    explanation: "Kişi adları ve bunlara bağlı unvanlar büyük harfle başlamalıdır: 'Mustafa Kemal Paşa'."
  },
  {
    id: 6,
    category: "Tarihlerin Yazımı",
    question: "Aşağıdaki cümlelerin hangisinde tarihlerin ve ay isimlerinin yazımı YANLIŞTIR?",
    options: [
      "A) Sınav 24 Haziran 2024 Pazar günü yapılacak.",
      "B) Her yıl Eylül ayında okullar eğitime başlıyor.",
      "C) 29 Ekim 1923 tarihinde Cumhuriyet ilan edildi.",
      "D) Okulumuz 12 Mayıs Cuma günü gezi düzenleyecek."
    ],
    answer: 1, // B
    explanation: "Belirli bir günü veya tarihi (rakamla) göstermeyen ay ve gün adları küçük harfle başlar: 'eylül ayında'."
  },
  {
    id: 7,
    category: "Birleşik Sözcükler",
    question: "Aşağıdaki cümlelerin hangisinde birleşik sözcüklerin yazımında bir YANLIŞLIK vardır?",
    options: [
      "A) Kaybolan cüzdanını polise başvurarak aradı.",
      "B) Her akşam saatlerinde bir şeyler atıştırmayı sever.",
      "C) Yolun kenarındaki aş evi yoksullara sıcak yemek dağıtıyor.",
      "D) Olay yerinde suçüstü yakalanan şüpheli karakola götürüldü."
    ],
    answer: 2, // C
    explanation: "TDK kuralına göre '-evi' ile kurulan birleşik kelimeler bitişik yazılır: 'Aşevi'."
  },
  {
    id: 8,
    category: "Yön İsimlerinin Yazımı",
    question: "Aşağıdaki cümlelerin hangisinde yön isimlerinin yazımı DOĞRUDUR?",
    options: [
      "A) Rüzgar Batıdan esmeye başladığında hava soğuyacak.",
      "B) Türkiye'nin Kuzeyi yağışlı havanın etkisine giriyor.",
      "C) Güney Rüzgarları bölgede sıcaklığı artırdı.",
      "D) Bu bölge Doğu Anadolu'nun zengin kültürünü yansıtır."
    ],
    answer: 3, // D
    explanation: "Yön isimleri özel isimden SONRA gelirse veya tek başına yön bildirirse küçük yazılır ('Doğu Anadolu'nun güneyi'). D şıkkında 'Doğu Anadolu' özel isimden önce geldği için büyük yazılmıştır ve doğrudur!"
  }
];
