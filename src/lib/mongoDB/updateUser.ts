type UserParameter = {
    username: string
    name: string
    email: string
    country: string
    bio: string,
    web_page: {
        name: string,
        url: string
    }
    profileImage: {
        url: string,
        thumbnailUrl: string
    }
}

const updateUser = async ({
    username,
    name,
    email,
    country,
    bio,
    web_page,
    profileImage
}: UserParameter) => {
    try {
        const response = await fetch('/api/user/update', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, name, email, country, bio, web_page, profileImage })
        });
        const data = await response.json();
        return data;

    } catch (e) {
        console.log(e);
        return { status: 500, statusText: "Internal Server Error" }
    }
}

export default updateUser;