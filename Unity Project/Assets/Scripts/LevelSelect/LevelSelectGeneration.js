#pragma strict

public var startLevelButton: GameObject;
public var levelsToGen: int;
public var zoneUnlocked: int;
public var xSpacing: float;
public var nextLevelPos: Vector3;
public var maxZPosObj: GameObject;
public var minZPosObj: GameObject;
public var islands: GameObject[];
public var islandsToGen: int;
public var nextIslandPos: Vector3;

function Start () {

		zoneUnlocked = PlayerPrefs.GetInt ("zoneUnlocked");
		Debug.Log("zones unlocked " + zoneUnlocked);
		if (zoneUnlocked < 1)
		{
		zoneUnlocked = 1;
		PlayerPrefs.SetInt("zoneUnlocked", zoneUnlocked);
		}

	Random.InitState(3);


	//Generation Zones
	 for(var i : int = 1; i < levelsToGen; i++)
	 {
	 	nextLevelPos.x += xSpacing;
	 	nextLevelPos.z = Random.Range(minZPosObj.transform.position.z, maxZPosObj.transform.position.z);
	 	var newZone = Instantiate(startLevelButton, nextLevelPos, Quaternion.Euler(Vector3(90,0,0)));
	 	newZone.GetComponent(StartLevelButton).zoneNumber = i;
	 	newZone.transform.SetParent(this.gameObject.transform);
	 }

	 /*
	 //Generate Islands
	 for(var x : int = 1; x < islandsToGen; x++)
	 {
	 	nextIslandPos.x += Random.Range(1,5);
	 	nextIslandPos.z = Random.Range(minZPosObj.transform.position.z, maxZPosObj.transform.position.z);
	 	var randIsland = Random.Range(0, islands.Length);
	 	var newIsland = Instantiate(islands[randIsland], nextIslandPos, Quaternion.Euler(Vector3(0,0,0)));
	 	newIsland.transform.SetParent(this.gameObject.transform);
	 	
	 	
	 }
	*/
}

