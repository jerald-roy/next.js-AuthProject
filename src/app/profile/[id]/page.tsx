
export default async function Profile({ params }: { params: { id: string } }) {
    const {id} = await params
    return <div className="flex min-h-screen justify-center items-center">
        <div className="flex flex-col items-center">
            <h1>Profile</h1>
            <br />
            <p>Profile page</p>
            <p>{`id : ${id}`}</p>
        </div>
    </div>
}