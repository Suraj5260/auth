import conf from "../conf/conf"
import { Client, Account, ID } from "appwrite";

export class AuthService {
    clint = new Client();
    account;

    constructor() {
        this.clint
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.account = new Account(this.client);
    }

    // sign in
    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            if (userAccount) {
                // call another method
                return this.login({ email, password })
            } else {
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    // Log in
    async login({ email, password }) {
        try {
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    // verifying Logged in or not. 
    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            // throw error;
            console.log("Appwrite service :: getCurrentUser :: error", error);
        }

        return null;
    }

    // Log out , deleting all the sessions.
    async logout() {

        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite service :: logout :: error", error);
        }
    }
}

const authService = new AuthService()

export default authService;