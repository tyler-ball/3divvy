import { UseAuthenticator } from '@aws-amplify/ui-react-core';
import { AuthUser } from 'aws-amplify/auth';
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../amplify/data/resource";
import { UserProfileUpdateForm } from "../ui-components";
import { useState, useEffect } from 'react';

type UserProfile = Schema["UserProfile"]["type"]

const client = generateClient<Schema>();

export default function Profile({ signOut, user }: { signOut: UseAuthenticator['signOut'] | undefined, user: AuthUser | undefined }) {
    const [userProfiles, setUserProfiles] = useState<UserProfile[]>([])

    useEffect(() => {
        const sub = client.models.UserProfile.observeQuery({
            // filter: { profileOwner: { eq: filterId } },
            authMode: "userPool"
        }).subscribe({
            next: ({ items, isSynced }) => {
                setUserProfiles([...items]);
            },
        });
        return () => sub.unsubscribe();
    }, []);

    return (
        <>
            <h1>{user?.signInDetails?.loginId}'s Profile</h1>

            {userProfiles[0] ? <UserProfileUpdateForm
                id={userProfiles[0].id}
                overrides={{
                    profileOwner: { isDisabled: true },
                    email: { isDisabled: true }
                }}
            /> : ''}

            <button onClick={signOut}>Sign out</button>
        </>
    )
}