// GET request depending on user
export const fetchUserPhotos = async (user: string | null) => {

    const response = await fetch('https://wedding-app-fmvx.onrender.com/gallery', {
        method: "GET",
        headers: { "Authorization": `Bearer ${user}` },
    });

    const {data} = await response.json();

    return data;
};

// DELETE request depenging on photo id
export const deletePhoto = async (_id: string | undefined) => {

    try {
        const response = await fetch('https://wedding-app-fmvx.onrender.com/gallery', {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({id: _id}),
    });

    const result = await response.json();
    return result;
    
    } catch (err) {
        console.error('Error in deleting photo: ', err)
    };
};


