// import { EventErmitter } from 'events'
import Moralis from 'moralis'

export default class Authic { // TODO Extend EventErmitter

  // User
  profile = {}

  // Utils
  isAuthenticated = false

  // Web3
  Moralis = Moralis

  constructor(config) {
    // super()

    this.Moralis.initialize(config.app_id, config.masterKeys || undefined)
    this.Moralis.serverURL = config.serverURL
  }

  async init() {
    try {
      await this.initialize()
    } catch (e) {
      throw new Error(e);
    }
  }

  async initialize() {
    try {
      const profile = await this.loadUser()

      if (profile) {
        this.Moralis.onAccountsChanged(async (accounts) => {
          const confirmed = confirm('Link this address to your account?');
          if (confirmed) {
            for (let account of accounts) {
              await this.Moralis.link(account)
            }
          }
        })
      }
    } catch (e) {
      throw new Error(e);
    }
  }

  async auth() {
    return this.authenticate()
  }

  async authenticate() {
    try {
      const user = await this.Moralis.Web3.authenticate()
      if (user) {
        this.profile = {
          username: user.attributes.username,
          address: user.attributes.ethAddress,
          accounts: user.attributes.accounts
        }
        return true
      }
    } catch (e) {
      throw new Error(e)
    }
  }

  async loadUser() {
    try {
      const profile = await this.Moralis.User.current()

      if (profile) {
        this.profile = {
          username: profile.attributes.username,
          address: profile.attributes.ethAddress,
          accounts: profile.attributes.accounts
        }
        this.isAuthenticated = true
        return true
      }
    } catch (e) {
      throw new Error(e);
    }

  }

  async register(data) {
    await this.signUp(data);
  }

  async signUp(data) {
    try {
      const user = new this.Moralis.User();
      user.set('username', data.username);
      user.set('mail', data.mail);
      user.set('password', data.password);

      return await user.signUp();
    } catch (e) {
      throw new Error(e);
    }
  }

  async signIn(data) {
    await this.logIn(data);
  }

  async logIn(data) {
    try {
      if (data.username && data.password) {
        return await this.Moralis.User.logIn(data.username, data.password)

      } else if (data === 'metamask') {
        let user = this.Moralis.User.current();
        if (!user) {
          return await this.Moralis.Web3.authenticate();
        }
        return user;

      } else if (data === 'walletconnect') {
        await this.Moralis.Web3.authenticate({ provider: data });
        return await this.Moralis.Web3.enable({ provider: data });
      }
    } catch (e) {
      throw new Error(e);
    }
  }

  async signOut() {
    await this.logOut();
  }

  async logOut() {
    try {
      this.profile = {};
      return await this.Moralis.User.logOut();
    } catch (e) {
      throw new Error(e);
    }
  }

  async link(account) {
    try {
      return await this.Moralis.link(account)
    } catch (e) {
      throw new Error(e);
    }
  }

  async unlink(account) {
    try {
      const confirmed = confirm('Are you sure you want to remove this address?');
      if (!confirmed) {
        return;
      }

      await this.Moralis.Web3.unlink(account);
    } catch (e) {
      throw new Error(e);
    }
  }

  async edit(data){
    try {
      const user = new this.Moralis.User();

      if (data.username) {
        user.set('username', data.username);
        this.profile.username = data.username;
      }

      if (data.mail) {
        user.set('mail', data.mail);
      }

      if (data.profileImage) {
        console.log(data.profileImage);
        // const file = new Moralis.File('', data.profileImage, "image/png");
        // user.set('profileImage', data.profileImage);
      }

      if (data.password) {
        user.set('password', data.password);
      }

      // return await user.save();
    } catch (e) {
      throw new Error(e);
    }
  }
}
