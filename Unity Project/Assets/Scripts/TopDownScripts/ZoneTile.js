#pragma strict
public var powerUpPrefab: GameObject;
public var powerUpSpawnPos: GameObject;

function Start () {

	Instantiate(powerUpPrefab, powerUpSpawnPos.transform.position, transform.rotation);
	
}
