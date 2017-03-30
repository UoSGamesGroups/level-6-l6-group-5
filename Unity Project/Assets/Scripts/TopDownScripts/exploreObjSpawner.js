#pragma strict
public var obj: GameObject[];
public var tiles: GameObject[];
public var player: GameObject;
private var spawnPos: Vector3;
public var spawnTime: float;
public var timeUntilSpawn: float;
public var spawnDistance: float;
public var minZ: float;
public var maxZ: float;
//end of tile is the x value of the right most obj
public var endOfTile: float;
//padding = size of space between tiles
public var padding: float;

function Start ()
{
	GetNextSpawnPos();
}

function Update () 
{
/*old system
	spawnTime += 1 * Time.deltaTime;
	if(spawnTime > timeUntilSpawn){
	GetNextSpawnPos();
	SpawnObj();
	spawnTime = 0;
	}
*/
	spawnTime += 1 * Time.deltaTime;
	if(spawnTime > timeUntilSpawn)
	{
		SpawnTile();
		GetNextSpawnPos();
		spawnTime = 0;
	}
}

function GetNextSpawnPos()
{
	spawnPos.x = endOfTile + padding;
}
 function SpawnTile()
{
	var tile = Instantiate(tiles[Random.Range(0,tiles.Length)],spawnPos,transform.rotation);
	var lastX: float;
	var tileParent: Transform = tile.transform;
	for(var childObj : Transform in tileParent)
	{
		var currentX = childObj.transform.position.x;
		if(currentX > lastX)
		{
			endOfTile = childObj.transform.position.x;
		}
	}
}
 
/* old system function SpawnObj(){
	Instantiate(obj[Random.Range(0,obj.Length)],spawnPos,transform.rotation);
	if(timeUntilSpawn > 0.5)
	timeUntilSpawn -= 0.1;
}

function GetNextSpawnPos(){
var newX: float = player.transform.position.x + spawnDistance;
var newZ: float = Random.Range(minZ,maxZ);
	spawnPos.x = newX;
	spawnPos.z = newZ;
}*/
