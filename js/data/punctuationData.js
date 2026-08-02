// %100 TDK Uyumlu Noktalama İşaretleri Soru Bankası (Oyun 4)
export const PUNCTUATION_QUESTIONS = [
  {
    id: 1,
    category: "Virgül ( , ) Kullanımı",
    question: "Aşağıdaki cümlelerin hangisinde virgülün (,) kullanımı YANLIŞTIR?",
    options: [
      "A) Fırtına dindi, deniz duruldu, gemiler limana sığındı.",
      "B) Ya bu deveyi gütmeli, ya bu diyardan gitmeli.",
      "C) Genç, adama doğru hızlı adımlarla yaklaştı.",
      "D) Meyveleri, sebzeleri ve içecekleri çantaya yerleştirdi."
    ],
    answer: 1, // B
    explanation: "TDK kuralı: Cümlede tekrarlı bağlaçlardan (ya... ya, hem... hem, ne... ne) önce ve sonra VİRGÜL KONMAZ! (B şıkkında 'ya... ya' bağlacı arasında virgül kullanılamaz)."
  },
  {
    id: 2,
    category: "Noktalı Virgül ( ; ) Kullanımı",
    question: "Aşağıdaki cümlelerin hangisinde noktalı virgül (;) yerinde ve doğru kullanılmıştır?",
    options: [
      "A) Roman; öykü, tiyatro ve masala göre daha uzundur.",
      "B) Erkek çocuklara Doğan, Tuğrul; kız çocuklara ise İnci, Çiçek adları verilir.",
      "C) Yarın buraya geleceğim; seninle konuşacağım.",
      "D) Pazardan elma, armut; alıp eve döndüm."
    ],
    answer: 1, // B
    explanation: "TDK kuralı: Cümle içinde virgüllerle ayrılmış tür veya takımları birbirinden ayırmak için NOKTALI VİRGÜL (;) kullanılır. (B şıkkında erkek ve kız isim grupları ayrılmıştır)."
  },
  {
    id: 3,
    category: "İki Nokta ( : ) ve Açıklama",
    question: "Aşağıdaki cümlelerin hangisinde iki noktanın (:) kullanımıyla ilgili bir HATA yapılmıştır?",
    options: [
      "A) Kendimi şöyle tanıtayım: İki çocuk babası bir öğretmenim.",
      "B) Milli Edebiyat akımının temsilcilerinden bazıları şunlardır: Ömer Seyfettin, Ziya Gökalp.",
      "C) Bahçede pek çok meyve vardı: elma, armut, kiraz...",
      "D) İki nokta koyduktan sonra: her zaman büyük harfle başlanır."
    ],
    answer: 3, // D
    explanation: "TDK kuralı: İki noktadan sonra gelen kısım cümle niteliğinde değilse (örnekler sıralanıyorsa) küçük harfle başlar. D şıkkındaki açıklama cümlesi kural hatası içerir."
  },
  {
    id: 4,
    category: "Üç Nokta ( ... ) Kullanımı",
    question: "Aşağıdaki cümlelerin hangisinde üç noktanın (...) kullanımı YANLIŞTIR?",
    options: [
      "A) Kırda rengârenk çiçekler, kelebekler, cıvıl cıvıl kuşlar...",
      "B) Kılavuzu karga olanın burnu b...tan çıkmaz.",
      "C) Tam zamanında gelmişti...",
      "D) Sana söyleyeceğim o kadar çok şey var ki..."
    ],
    answer: 2, // C
    explanation: "TDK kuralı: Yüklemi bulunan, tamamlanmış cümlelerin sonuna NOKTA (.) konur. C şıkkında cümle yüklemli ve tamamlanmış olduğu için üç nokta değil nokta konmalıdır."
  },
  {
    id: 5,
    category: "Virgül Kullanılmayan Yerler",
    question: "Aşağıdaki cümlelerin hangisinde virgülün kullanımı İMLA HATASIDIR?",
    options: [
      "A) Buraya gelip, eşyalarını almadan gitti.",
      "B) Çalışkan, dürüst ve yardımsever bir insandı.",
      "C) Akşam olunca, sokaklar sessizliğe büründü.",
      "D) Kitabı okudum, özetini çıkardım, arkadaşıma verdim."
    ],
    answer: 0, // A
    explanation: "TDK kuralı: Metin içinde art arda gelmeyen zarf-fiil eki (-ip, -erek, -ince) almış kelimelerden sonra VİRGÜL KONMAZ! (A şıkkında 'gelip' zarf-fiilinden sonra virgül konması hatadır)."
  },
  {
    id: 6,
    category: "Kesme İşareti ( ' ) Kuralları",
    question: "Aşağıdaki cümlelerin hangisinde kesme işaretinin kullanımı YANLIŞTIR?",
    options: [
      "A) 1923'te kurulan Cumhuriyetimiz büyümeye devam ediyor.",
      "B) Türk Dil Kurumu'na yeni bir dilekçe sundu.",
      "C) Yakup Kadri'nin Yaban romanı çok etkileyicidir.",
      "D) Boğaz'dan geçen gemileri keyifle izledik."
    ],
    answer: 1, // B
    explanation: "TDK kuralı: Kurum, kuruluş, kurul ve iş yeri adlarına gelen ekler KESME İŞARETİYLE AYRILMAZ! (Türk Dil Kurumuna)"
  },
  {
    id: 7,
    category: "Tırnak İşareti ( \" \" )",
    question: "Aşağıdaki cümlelerin hangisinde tırnak işaretinin kullanımıyla ilgili bir HATA vardır?",
    options: [
      "A) Atatürk: \"Gelecek göklerdedir.\" demiştir.",
      "B) Yazann \"Çalıkuşu\" romanını tekrar okudum.",
      "C) \"İzmir\" üzerine yazılan şiirler derlendi.",
      "D) Arkadaşlar, \"Yarın saat dokuzda toplanıyoruz\" dedi."
    ],
    answer: 3, // D
    explanation: "TDK kuralı: Tırnak içindeki alıntının sonundaki noktalama işareti (nokta, soru işareti vb.) tırnak İÇİNDE kalmalıdır: '...toplanıyoruz.' dedi."
  },
  {
    id: 8,
    category: "Noktalı Virgül vs İki Nokta",
    question: "Aşağıdaki cümlelerin hangisinde boş bırakılan yere NOKTALI VİRGÜL (;) getirilmelidir?",
    options: [
      "A) İnsan iki şeye dikkat etmeli ( ) sağlığına ve zamanına.",
      "B) Pazardan elma, muz ( ) marketten süt, peynir aldık.",
      "C) Şunu unutma ( ) Çalışmak başarının anahtarıdır.",
      "D) Size tek bir soru soracağım ( ) Sınava hazır mısınız?"
    ],
    answer: 1, // B
    explanation: "B şıkkında pazardan alınanlar ile marketten alınan farklı grupları ayırmak için NOKTALI VİRGÜL (;) getirilir. Diğer şıklarda açıklama veya örnek vereceği için İKİ NOKTA (:) getirilir."
  },
  {
    id: 9,
    category: "Zarf-Fiil ve Virgül Kuralı",
    question: "Aşağıdaki cümlelerin hangisinde virgül (,) KULLANILABİLİR?",
    options: [
      "A) Sınavı kazanınca ( ) ailesine haber verdi.",
      "B) Koşarak eve gitti ( ) hemen üzerini değiştirdi.",
      "C) Hem ağlarım ( ) hem giderim diyordu.",
      "D) Ders çalıştıkça ( ) başarısı artıyordu."
    ],
    answer: 1, // B
    explanation: "B şıkkında sıralı iki ayrı cümleyi ayırmak için virgül konur. Zarf-fiillerden (-ince, -tıkça) ve tekrarlı bağlaçlardan (hem... hem) sonra virgül konmaz."
  },
  {
    id: 10,
    category: "Kısa Çizgi ( - ) Kullanımı",
    question: "Aşağıdaki durumların hangisinde KISA ÇİZGİ ( - ) kullanılmaz?",
    options: [
      "A) Satıra sığmayan kelimeler hecelerinden bölünürken",
      "B) Arasında, ile, ve anlamları katmak için (Ankara-İstanbul)",
      "C) Cümle içindeki ara sözleri ve ara cümleleri ayırmak için",
      "D) Alıntı cümlelerin sonuna kaynak göstermek için"
    ],
    answer: 3, // D
    explanation: "Alıntı cümlelerin sonunda kaynak göstermek için yay ayraç ( ) veya tırnak kullanılır, kısa çizgi kullanılmaz."
  }
];
