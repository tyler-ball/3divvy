# 3divvy

## Requirements

* Python >= 3.12
* Poetry
* AWS cli and log in with `aws configure`

## Usage

```
poetry install
streamlit run ui/landing.py
```

## Required environment variables

The following come from the AWS Cognito User Pool we have deployed

* `USER_POOL_ID`
* `CLIENT_ID`
* `CLIENT_SECRET`

