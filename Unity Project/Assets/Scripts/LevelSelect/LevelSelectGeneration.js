#pragma strict

public var startLevelButton: GameObject;
public var levelsToGen: int;
public var zoneUnlocked: int;
public var xSpacing: float;
public var nextLevelPos: Vector3;
public var maxZPosObj: GameObject;
public var minZPosObj: GameObject;

function Start () {

		zoneUnlocked = PlayerPrefs.GetInt ("zoneUnlocked");
		Debug.Log("zones unlocked " + zoneUnlocked);
		if (zoneUnlocked < 1)
		{
		zoneUnlocked = 1;
		PlayerPrefs.SetInt("zoneUnlocked", zoneUnlocked);
		}

	Random.InitState(3);

	 for(var i : int = 1; i < levelsToGen; i++)
	 {
	 	nextLevelPos.x += xSpacing;
	 	nextLevelPos.z = Random.Range(minZPosObj.transform.position.z, maxZPosObj.transform.position.z);
	 	var newZone = Instantiate(startLevelButton, nextLevelPos, Quaternion.Euler(Vector3(90,0,0)));
	 	newZone.GetComponent(StartLevelButton).zoneNumber = i;
	 	newZone.transform.SetParent(this.gameObject.transform);
	 }
	
}

