using UnityEngine;
using UnityEngine.UI;
using System.Collections;
using System.Collections.Generic;
using Facebook.Unity;

public class FacebookController : MonoBehaviour
{

	//public GameObject DialogLoggedIn;
	//public GameObject DialogLoggedOut;
	public GameObject DialogUsername;
	public GameObject DialogProfilePic;

	void Awake ()
	{
		FB.Init (SetInit, OnHideUnity);
	}

	void SetInit ()
	{

		if (FB.IsLoggedIn) {
			Debug.Log ("FB is logged in");
		} else {
			Debug.Log ("FB is not logged in");
		}

		DealWithFBMenus (FB.IsLoggedIn);

	}

	void OnHideUnity (bool isGameShown)
	{

		if (!isGameShown) {
			Time.timeScale = 0;
		} else {
			Time.timeScale = 1;
		}

	}

	public void FBlogin ()
	{
		var perms = new List<string> (){ "public_profile", "email", "user_friends" };
		FB.LogInWithReadPermissions (perms, AuthCallBack);
	}

	void AuthCallBack (IResult result)
	{
		
		
		if (FB.IsLoggedIn) {
			// AccessToken class will have session details
			var aToken = Facebook.Unity.AccessToken.CurrentAccessToken;
			// Print current access token's User ID
			Debug.Log (aToken.UserId);
			// Print current access token's granted permissions
			foreach (string perm in aToken.Permissions) {
				Debug.Log (perm);
			}
		} else {
			Debug.Log ("User cancelled login");
		}

		DealWithFBMenus (FB.IsLoggedIn);
	}


	void DealWithFBMenus (bool isLoggedIn)
	{

		if (isLoggedIn) {
			//DialogLoggedIn.SetActive (true);
			//DialogLoggedOut.SetActive (false);

			FB.API ("/me?fields=first_name", HttpMethod.GET, DisplayUsername);
			FB.API ("/me/picture?type=square&height=128&width=128", HttpMethod.GET, DisplayProfilePic);

		} else {
			//DialogLoggedIn.SetActive (false);
			//DialogLoggedOut.SetActive (true);
		}

	}

	void DisplayUsername (IResult result)
	{
		DialogUsername.SetActive (true);
		Text UserName = DialogUsername.GetComponent<Text> ();

		if (result.Error == null) {

			UserName.text = "Hi there, " + result.ResultDictionary ["first_name"];

		} else {
			Debug.Log (result.Error);
		}

	}

	void DisplayProfilePic (IGraphResult result)
	{
		DialogProfilePic.SetActive (true);
		if (result.Texture != null) {

			Image ProfilePic = DialogProfilePic.GetComponent<Image> ();

			ProfilePic.sprite = Sprite.Create (result.Texture, new Rect (0, 0, 128, 128), new Vector2 ());

		}

	}

	public void InviteFriends ()
	{
		FB.AppRequest (
			message: "This game is awesome, join me. now.",
			title: "Invite your friends to join you"
		);
	}
}