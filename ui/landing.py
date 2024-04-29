import streamlit as st
from pycognito import Cognito
import os

# Cognito setup
USER_POOL_ID = os.environ.get('USER_POOL_ID')
CLIENT_ID = os.environ.get('CLIENT_ID')
CLIENT_SECRET = os.environ.get('CLIENT_SECRET')

# Create a Cognito object
u = Cognito(USER_POOL_ID, CLIENT_ID, client_secret=CLIENT_SECRET)

# Session state to manage the display logic
if 'confirmation_needed' not in st.session_state:
    st.session_state.confirmation_needed = False

if 'username' not in st.session_state:
    st.session_state.username = None
if st.session_state.username:
    u.username = st.session_state.username

title_text = 'Hello World'
if 'tokens' not in st.session_state:
    st.session_state.tokens = None
if st.session_state.tokens:
    u.id_token = st.session_state.tokens['id_token']
    u.access_token = st.session_state.tokens['access_token']
    u.refresh_token = st.session_state.tokens['refresh_token']
    user = u.get_user()
    title_text = f'Hello, {user.username}!'

# Title of the page
st.title(title_text)

# Expandable section for Login
with st.expander("Login"):
    email = st.text_input("Email", key="login_email")
    password = st.text_input("Password", key="login_password", type="password")
    login_button = st.button("Login")

    if login_button:
        st.session_state.username = email
        u.username = email
        u.authenticate(password)
        st.session_state.tokens = {'id_token': u.id_token, 'access_token': u.access_token, 'refresh_token': u.refresh_token}
        st.success("Login successful!")
        st.rerun()


# Expandable section for Signup
with st.expander("Signup"):
    if not st.session_state.confirmation_needed:
        signup_email = st.text_input("Email", key="signup_email")
        signup_password = st.text_input("Password", key="signup_password", type="password")
        confirm_password = st.text_input("Confirm Password", key="confirm_password", type="password")
        signup_button = st.button("Signup")

        if signup_button:
            if signup_password == confirm_password:
                # Set base attributes and register the user
                st.session_state.username = signup_email
                u.set_base_attributes(email=signup_email)
                u.username = signup_email
                u.register(signup_email, signup_password)
                st.session_state.confirmation_needed = True
                st.rerun()
            else:
                st.error("Passwords do not match.")
    else:
        # Confirmation code input
        st.success("Please check your email for the confirmation code.")
        confirmation_code = st.text_input("Confirmation Code", key="confirmation_code")
        confirm_button = st.button("Confirm")
        
        if confirm_button:
            u.confirm_sign_up(confirmation_code)
            st.success("Your account has been confirmed!")
            st.session_state.confirmation_needed = False

