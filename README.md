# Deployment Bootstrap Notes

```
ENV=sitename-dev ### adjust

aws cloudformation deploy --stack-name $ENV --template-file .\pipeline.yaml --capabilities CAPABILITY_NAMED_IAM

(cd server/userdata && chalice deploy --stage xxxx)

git commit # include .chalice/json files!
git push

aws cloudformation deploy --stack-name $ENV-cloudfront --template-file .\cloudfront.yaml --capabilities CAPABILITY_NAMED_IAM --parameter-override EnvPrefix=$ENV
```