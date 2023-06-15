## Ingliz tilini o'rgatuvchi dastur (InTeacher)

Ushbu dastur foydalanuvchilarga ingliz tilini o'rganishda ko'maklashadi. Dastur foydalanuvchilarga online videodarslar va mashqlar taklif qiladi, bu esa ularni ingliz tilini ko'nikmalarini oshirishga yordam beradi.


## Qanday o'rnatiladi ?

- Node.js: Node.js kompyuteringizda o'rnatilganligiga ishonch hosil qiling. Siz uni rasmiy veb-saytdan yuklab olishingiz mumkin: https://nodejs.org

  ### nodejs o'rnatilganligini tekshirish:
  ```shell script
  $ node --version
  $ npm --version
  ```
  
- Gitni https://git-scm.com/download/win ushbu manzildan yuklab olib uni o'rnating.
- Git o'rnatilganligiga ishonch hosil qiling:
  ```bash
  $ git -v
  ```
- Gitga username va emaillaringizni kiriting:
  ```bash
  $ git config --global user.name "Your name"
  $ git config --global user.email "youremail@yourdomain.com"
  ```
***
# O'rnatishni boshlash

1. GitHub’dan omborni klonlang:

    ``` bash
    $ git clone https://github.com/abduraimovabdurahmon/englishninja.git
    ```
    
2. Loyiha katalogiga o'ting:

    ``` shell
    cd *clonlangan katalog manzili
    ```
    
 3. Paketlarni o'rnating:

    ``` shell
    $ npm install
    ```
    
  4. Atrof-muhit o'zgaruvchilarini o'rnating:

      - Loyihaning asosiy katalogida `.env` faylini yarating.
      - Quyidagi muhit o'zgaruvchilarini qo'shing va to'ldiruvchi qiymatlarni o'zingizniki bilan almashtiring:

        ```
        JWT_SECRET= // Sirli so'z (o'zingiz o'ylab topasiz)
        EMAIL= nodemailer-uchun-elektron-pochtangiz
        PASSWORD= nodemailer-uchun-parolingiz
        ```
           > Email uchun parolni ushbu: [https://myaccount.google.com](https://myaccount.google.com/) dan olishingzi mumkin.
  5. Dasturni ishga tushiring:

      - production modeda ishga tushirish:

        ``` shell
        $ npm start
        ```
      - development modeda ishga tushirish:
        ``` shell
        $ npm run dev
        ```       
        
      # Agar dastur muvaffaqiyatli ishga tushsa:
      [http://localhost:3000/](http://localhost:3000/)
      manziliga o'ting!
    
