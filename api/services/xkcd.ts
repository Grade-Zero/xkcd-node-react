let xkcd = require('xkcd-api')

export async function getRandomComic(): Promise<boolean> {
    return xkcd.random(function(error: any, response: any) {
        if (error) {
            console.error(error);
            // return error
        } else {
            console.log(response);
            // return response
        }
        return true
    })
}

export async function getRandomComicTs(): Promise<boolean> {
    return xkcd.random((error: any, response: any) => {
        if (error) {
            console.error(error);
            // return error
        } else {
            console.log(response);
            // return response
        }
        return true
    })
}
