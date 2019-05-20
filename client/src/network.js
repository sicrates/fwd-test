
class network {

    _top100 = async () => {

        //let url = 'https://itunes.apple.com/hk/rss/topfreeapplications/limit=100/json'
        let url = '/api/top100'

        console.log( url )
        
        let response = await fetch(url, {
            method: 'get',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })

        let j = await response.json();

        console.log(j)

        return j
    }

    _lookup = async (app_id) => {

        //let url = 'https://itunes.apple.com/hk/lookup?id=' + app_id
        let url = '/api/lookup/' + app_id

        console.log( url )
        
        let response = await fetch(url, {
            method: 'get',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })

        let j = await response.json();

        console.log(j)

        return j
    }

    _top10 = async () => {

        //let url = 'https://itunes.apple.com/hk/rss/topgrossingapplications/limit=10/json'
        let url = '/api/top10'

        console.log( url )
        
        let response = await fetch(url, {
            method: 'get',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })

        let j = await response.json();

        console.log(j)

        return j
    }

}

export default new network()