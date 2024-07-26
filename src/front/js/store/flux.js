const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			checkAuth: async () => {
				try{
					const token = getStore().token || localStorage.getItem('token')
					const resp = await fetch(process.env.BACKEND_URL + "/api/token", {
						headers: {
							'Content-Type': 'application/json',
							'Authorization' : `Bearer ${token}`
						},
						method: 'GET',
					})
					if (resp.status!=200) return false
					const data = await resp.json()
					console.log(data)
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}

			},

			register: async (formData) => {
				try{
					const resp = await fetch(process.env.BACKEND_URL + "/api/signup", {
						headers: {
							'Content-Type' : 'application/json'
						},
						method: 'POST',
						body: JSON.stringify(formData)
					})
					const data = await resp.json()
					setStore({ user: data.user, token: data.token })
					localStorage.setItem('token', data.token)
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},

			login: async (formData) => {
				try{
					const resp = await fetch(process.env.BACKEND_URL + "/api/login", {
						headers: {
							'Content-Type' : 'application/json'
						},
						method: 'POST',
						body: JSON.stringify(formData)
					})
					const data = await resp.json()
					setStore({ user: data.user, token: data.token })
					localStorage.setItem('token', data.token)
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},

			logout: () => {
				localStorage.removeItem('token')
				setStore({user : null, token : null})
				return true
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
