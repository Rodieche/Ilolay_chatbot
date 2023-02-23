# Ilolay ChatBot

## Chatbot for MDA helper

* Developer: Rodolfo Echenique
* Enterprise: Sucesores de Alfredo Williner S.A.
* Area: Information Technology

Backend: Google Apps Script  
Environment: clasp

# Secrets

Create a file called **.clasp.json** with the next code:

```javascript
{
    "scriptId": ${{secrets.SCRIPTID}},
    "rootDir":"src"
}
```

and add it to **.gitignore** file

---

# Slashes usage

* /interno

To use this slash you must write in the chat bar **/interno** and the number or a name of a person you are looking for like in the next images:

![use of intern with number](https://res.cloudinary.com/dxputmc7c/image/upload/v1677176401/Chatbot/interno_tivdm5.png)

If you enter a name and that match with more than one user, the bot will return the list of users with that name:

![use of interno with name](https://res.cloudinary.com/dxputmc7c/image/upload/v1677176682/Chatbot/internos_xk3vyf.png)