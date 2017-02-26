#pragma strict
public var obj: GameObject[];
public var player: GameObject;
private var spawnPos: Vector3;
public var spawnTime: float;
public var timeUntilSpawn: float;
public var spawnDistance: float;
public var minZ: float;
public var maxZ: float;

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
	Instantiate(obj[Random.Range(0,obj.Length)],spawnPos,transform.rotation);
	if(timeUntilSpawn > 0.5)
	timeUntilSpawn -= 0.1;
}

function GetNextSpawnPos(){
var newX: float = player.transform.position.x + spawnDistance;
var newZ: float = Random.Range(minZ,maxZ);
	spawnPos.x = newX;
	spawnPos.z = newZ;
}
