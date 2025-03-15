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

9. API login check cookie same
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
Expected output: `User logged in`, cookie in this request is the same as received in step 8

10. API logout cookie working
```
curl -c cookies.txt http://localhost:3000/api/auth/manage -X POST -d '{"username":"yourUser", "password":"yourPass"}' -H "Content-Type: application/json"
curl -b cookies.txt http://localhost:3000/api/auth/logout -X POST -d '{"username":"yourUser"}' -H "Content-Type: application/json"

OR

curl --request POST \
  --url 'http://localhost:3000/api/auth/logout?=' \
  --header 'Content-Type: application/json' \
  --header 'User-Agent: insomnia/8.3.0' \
  --data '{
	"username": "Boo!!"
}'
```
Expected output: `Logged out successfully`

11. API logout cookie gone not working
```
curl -b cookies.txt http://localhost:3000/api/auth/logout -X POST -d '{"username":"yourUser"}' -H "Content-Type: application/json"

OR

curl --request POST \
  --url 'http://localhost:3000/api/auth/logout?=' \
  --header 'Content-Type: application/json' \
  --header 'User-Agent: insomnia/8.3.0' \
  --data '{
	"username": "Boo!!"
}'
```
Expected output: `Not logged in`

## Template:
x. Name
Request:
```
```
Expected output: ``
