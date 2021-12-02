db.createUser(
    {
      user: "acaldev",
      pwd: "doesitreallymatterwhatthisis",
      roles: [
        {
          role: "readWrite",
          db: "app"
        }
      ]
    }
  )