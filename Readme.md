# Todo List Backend App

## Menjalankan Base Project

- Jalankan perintah `npm i` atau `npm install ` untuk menginstal package yang dibutuhkan.
- Kemudian jalankan perintah `npm run dev` untuk menjalankan aplikasinya.
- Kemudian coba hit server dari cmd `curl --location 'http://localhost:10000/api/v1/test'`

# POST USER

curl -X POST -H "Content-Type: application/json" -d '{"username": "testuser", "password": "testpass"}' 'localhost:10000/api/v1/task'

# GET USER

curl --location 'localhost:10000/api/v1/task'

# UPDATE USER

curl --location 'localhost:10000/api/v1/task' --request PUT \
--header 'Content-Type: application/json' \
--data '{
"id":3,
"username": "newusername",
"password": "newpassword"
}'

# DELETE USER

curl -X DELETE -H "Content-Type: application/json" -d '{
"id": 1
}' 'localhost:10000/api/v1/task'

# CREATE TODO BY USER

curl -X POST -H "Content-Type: application/json" -d '{
"title": "todo baru",
"description": "ini todo user 3.",
"userId": 3
}' 'localhost:10000/api/v1/task/todo'

# SHOW TODO BY USER

curl 'localhost:10000/api/v1/task/todo/3'

#UODATE TODO USER
curl -X PUT -H "Content-Type: application/json" -d '{
"title": "Updated todo",
"description": "Updated description"
}' 'localhost:10000/api/v1/task/todo/1'
