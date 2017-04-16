#pragma strict

public var zoneNumber: int;
public var zoneNumberText: TextMesh;
public var lockedImage: GameObject;

function Start () {
	zoneNumberText.text = "Zone: " + zoneNumber;
	if (zoneNumber <= PlayerPrefs.GetInt("zoneUnlocked"))
	{
		lockedImage.SetActive (false);
	}
}

function Update () {
	
}
function OnMouseDown()
{
	//load zone
	//PlayerPrefs.SetInt("Level", zoneNumber);
	if (zoneNumber <= PlayerPrefs.GetInt("zoneUnlocked"))
	{
		PlayerPrefs.SetInt("currentLevel", zoneNumber);
		Application.LoadLevel ("runner");
	}
}