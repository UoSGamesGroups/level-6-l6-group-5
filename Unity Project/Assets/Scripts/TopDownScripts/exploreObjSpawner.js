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
public var bossSpawned: boolean;
public var boss: GameObject;
public var exploreScript: exploreControls;
public var chestPickUp: GameObject;

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
	if(spawnPos.x < exploreScript.endDistance)
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
	else if (!bossSpawned) 
	{
		var boss = Instantiate(boss, Vector3(spawnPos.x, spawnPos.y + 0.393, spawnPos.z) , Quaternion.Euler(-90,0,0));
		boss.GetComponent(MoveBoss).player = player;
		bossSpawned = true;
		// make a powerup a chest
		var powerUps:GameObject[] = GameObject.FindGameObjectsWithTag ("PowerUp");
		var randPowerUpNumber: int = Random.Range(0, powerUps.Length);
		var randPowerUp: GameObject = powerUps[randPowerUpNumber];
		var randPowerUpPos: Vector3 = randPowerUp.transform.position;
		Destroy (randPowerUp);
		Instantiate (chestPickUp, randPowerUpPos, transform.rotation);
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
