class AuthService {
  constructor({ tokenRepository }) {
    this.tokenRepository = tokenRepository;
  }
}

module.exports = AuthService;
