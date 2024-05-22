import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../amplify/data/resource';
import { AuthUser } from 'aws-amplify/auth';

import '../styles/homeStyle.css'
import { useEffect, useState } from 'react';

type Job = Schema['Job']['type'];

function JobsList(props: { jobs: Job[] }) {
    const jobs = props['jobs'];
    return (
        <table>
            <thead>
                <tr>
                    <td>Title</td>
                    <td>Created</td>
                    <td>Amount Offered</td>
                    <td>Description</td>
                </tr>
            </thead>
            {jobs.map((job) => {
                return (<tr>
                    <td>{job['title']}</td>
                    <td>{job['createdAt']}</td>
                    <td>{job['amountOffered']}</td>
                    <td>{job['description']}</td>
                    <td></td>
                </tr>);
            }
            )}
        </table>
    );
}

export default function Home({ user }: { user: AuthUser }) {
    const client = generateClient<Schema>();

    console.log("USERID: " + user.userId);

    const [userJobs, setUserJobs] = useState<Job[]>([]);

    const getUserJobs = async () => {
        const { data: jobs } = await client.models.Job.list({
            filter: {
                submitter: {
                    'eq': user.userId
                }
            },
            authMode: 'userPool'
        });
        setUserJobs(jobs === null ? [] : jobs);
        console.log("JOBS: " + jobs);
    }

    useEffect(() => { getUserJobs() });

    return (
        <JobsList jobs={userJobs} />
    )
}