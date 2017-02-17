#pragma strict
public var obj: GameObject;
public var player: GameObject;
public var spawnPos: Vector3;
public var spawnTime: float;
public var timeUntilSpawn: float;

function Update () 
{
	spawnTime += 1 * Time.deltaTime;
	if(spawnTime > timeUntilSpawn){
	GetNextSpawnPos();
	SpawnObj();
	spawnTime = 0;
	}
	
}

function SpawnObj(){
	Instantiate(obj,spawnPos,transform.rotation);
}

function GetNextSpawnPos(){
var newX: float = player.transform.position.x + 10;
var newZ: float = player.transform.position.z;
	spawnPos.x = newX;
	spawnPos.z = newZ;
}
