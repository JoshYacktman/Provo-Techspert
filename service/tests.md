# I'm creating a test suite for the api on insomnia. The curl requests and expected outputs are as follows:

1. API login fail
Request:
```
curl --request POST \
  --url http://localhost:3000/api/auth/login \
  --header 'Content-Type: application/json' \
  --header 'User-Agent: insomnia/8.3.0' \
  --data '{
	"username": "Boo!!",
	"password": "ATestPassword"
}'
```
Expected output: `No account of given username`

2. API create account bad username short
Request:
```
curl --request POST \
  --url http://localhost:3000/api/auth/manage \
  --header 'Content-Type: application/json' \
  --header 'User-Agent: insomnia/8.3.0' \
  --data '{
	"username": "No",
	"password": "ATestPassword"
}'
```
Expected output: `Username does not conform to standards`

3. API create account bad username long
Request:
```
curl --request POST \
  --url http://localhost:3000/api/auth/manage \
  --header 'Content-Type: application/json' \
  --header 'User-Agent: insomnia/8.3.0' \
  --data '{
	"username": "SuperLongUsernameThatShouldFail",
	"password": "ATestPassword"
}'
```
Expected output: `Username does not conform to standards`

4. API create account bad password short
Request:
```
curl --request POST \
  --url http://localhost:3000/api/auth/manage \
  --header 'Content-Type: application/json' \
  --header 'User-Agent: insomnia/8.3.0' \
  --data '{
	"username": "Boo!!",
	"password": "No"
}'
```
Expected output: `Password does not conform to standards`

5. API create account bad password long
Request:
```
curl --request POST \
  --url http://localhost:3000/api/auth/manage \
  --header 'Content-Type: application/json' \
  --header 'User-Agent: insomnia/8.3.0' \
  --data '{
	"username": "Boo!!",
	"password": "SuperLongPasswordThatShouldFail"
}'
```
Expected output: `Password does not conform to standards`

6. API create account work
Request:
```
curl --request POST \
  --url http://localhost:3000/api/auth/manage \
  --header 'Content-Type: application/json' \
  --header 'User-Agent: insomnia/8.3.0' \
  --data '{
	"username": "Boo!!",
	"password": "ATestPassword"
}'
```
Expected output: `User created`

7. API login bad credentials
Request:
```
curl --request POST \
  --url http://localhost:3000/api/auth/login \
  --header 'Content-Type: application/json' \
  --header 'User-Agent: insomnia/8.3.0' \
  --data '{
	"username": "Boo !!",
	"password": "ATestPassword"
}'
```
Expected output: `No account of given username`

8. API login work
Request:
```
curl --request POST \
  --url http://localhost:3000/api/auth/login \
  --header 'Content-Type: application/json' \
  --header 'User-Agent: insomnia/8.3.0' \
  --data '{
	"username": "Boo!!",
	"password": "ATestPassword"
}'
```
Expected output: `User logged in`


## Template:
x.
Request:
```
```
Expected output: ``
