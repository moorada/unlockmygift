# [UnlockMyGift](https://moorada.github.io/unlockmygift)

**UnlockMyGift** is a fun web application that lets you create a series of riddles or questions to “lock” a gift, and then challenge your friends or family to “unlock” it by solving your puzzle. It’s an exciting way to add mystery to gift-giving!

---

## Why You’ll Love UnlockMyGift

1. **Add Mystery to Your Gifts**  
   Instead of handing someone a present directly, you can wrap it in a series of riddles. Only those who guess all the answers correctly can “unlock” their gift!

2. **Easily Create Your Puzzle**  
   Use the **Generator** page to build your own quiz. Add images, multiple correct answers, and custom messages. You can even include witty remarks for when a guess is wrong!

3. **Share the `.unlock` File**  
   Once your quiz is ready, a `.unlock` file is generated. Simply send that file to your friend, or host it anywhere you like.

4. **Play the Quiz**  
   The recipient opens the **Unlocker** page, uploads the `.unlock` file, and attempts to solve the riddles. They’ll see fun or snarky messages when they get an answer wrong, and a triumphant reveal if they answer everything correctly.

5. **Multi-language Support**  
   Both the Generator and the Unlocker support English, Spanish, French, and Italian. A quick click on any flag changes the entire UI language on the fly.

---

## How to Use (User Perspective)

1. **Go to the Generator**  
   - Visit the [Generator page](https://moorada.github.io/unlockmygift) (then select “Generator” if needed).  
   - Click **“Create your Quiz”** and start filling out details:
     - **Quiz Name**  
     - **Description**  
     - **Final Message** (what should appear after all questions are answered)  
   - Add as many **Questions** as you like. For each question:
     - **Question** text  
     - **Correct Answers** (comma-separated)  
     - **Message if Correct** (what to show if guessed correctly)  
     - **Wrong Answers Messages** (multiple phrases you want to display, in order, for each failed attempt)  
     - **Images** (optional)  

2. **Generate the Puzzle**  
   - Once you’re done, click **“Save your LockedGift.”**  
   - You’ll download a special `.unlock` file.

3. **Send It to Your Friend**  
   - Email the `.unlock` file to the friend or loved one you want to surprise, or share it however you like.

4. **How to Play**  
   - Your friend goes to the [UnlockMyGift Unlocker](https://moorada.github.io/unlockmygift/unlocker.html).  
   - They upload the `.unlock` file.  
   - They’ll see the quiz info, start the questions, and must guess each one.  
   - If they mess up, they’ll see one of the fun “wrong answer” messages you created!  
   - If they succeed, they’ll see the final message you set and (hopefully) receive their physical or digital gift.

---

## Project Info & Technical Details

- **Technologies**:  
  - Plain HTML, CSS, and JavaScript  
  - [FilePond](https://pqina.nl/filepond/) is used for elegant file uploads.  
  - [LightGallery](https://www.lightgalleryjs.com/) for image previews.  
  - AES-GCM encryption via the **Web Crypto API** to “lock” the final message, as well as the entire quiz data.  
- **Multi-Language Support**:  
  - We’ve included dictionaries for English (en), Spanish (es), French (fr), and Italian (it).  
  - A small `<img>`-based flag selector switches language on the fly.  
- **Riddle Logic**:  
  - Each question can accept multiple correct answers.  
  - You can add an unlimited number of “wrong answer” messages, which display in a cycle each time the user fails.  
- **Encryption Scheme**:  
  - Every question can have multiple correct answers. We generate all possible “answer combinations” to encrypt the final message.  
  - The user’s actual answers form the final key to unlock the gift.  
- **Security Disclaimer**:  
  - This project is **just for fun**. Anyone with enough knowledge could inspect the `.unlock` file’s JSON and discover the solutions. This is not meant for serious data protection, only for entertaining puzzle-based gift revealing.

---

## Ready to Try?

Visit **[moorada.github.io/unlockmygift](https://moorada.github.io/unlockmygift)** to start creating or unlocking your next mystery gift. Spread the joy of riddles and surprise your friends with a playful challenge before they claim their prize!

Enjoy and have fun with **UnlockMyGift**!
