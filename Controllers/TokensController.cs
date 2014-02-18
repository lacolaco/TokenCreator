using CoreTweet;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace TokenCreator.Controllers
{
    public class TokensController : ApiController
    {

        private static Dictionary<int, OAuth.OAuthSession> _SessionDictionary = new Dictionary<int, OAuth.OAuthSession>();

        public OAuthSession Get(string consumerKey, string consumerSecret)
        {
            var token = OAuth.Authorize(consumerKey, consumerSecret);
            _SessionDictionary.Add(token.GetHashCode(), token);
            return new OAuthSession() { SessionToken = token.GetHashCode(), AuthorizeUri = token.AuthorizeUri.ToString() };
        }

        public Token Get(int sessionToken, string pinCode)
        {
            OAuth.OAuthSession session = null;
            _SessionDictionary.TryGetValue(sessionToken, out session);
            if (session == null) return null;
            try
            {
                var token = session.GetTokens(pinCode);
                return new Token() { AccessToken = token.AccessToken, AccessSecret = token.AccessTokenSecret };
            }
            catch
            {
                return null;
            }
        }
    }

    public class OAuthSession
    {
        public int SessionToken { get; set; }
        public string AuthorizeUri { get; set; }
    }

    public class Token
    {
        public string AccessToken { get; set; }
        public string AccessSecret { get; set; }
    }
}
