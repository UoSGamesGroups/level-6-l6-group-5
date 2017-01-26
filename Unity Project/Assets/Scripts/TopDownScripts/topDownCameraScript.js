#pragma strict
public var staticPos: Vector3;
public var chaseCameraOn: boolean;
public var maxPosX: float;
public var minPosX: float;
public var maxPosZ: float;
public var minPosZ: float;
public var player: GameObject;
public var chaseCameraHeight: float;
public var setLowestCameraHeight: float;



function Start () 
{
	staticPos = transform.position;
}

function Update () 
{
	
	
	
	if (chaseCameraOn)
	{
		transform.position.x = player.transform.position.x;
		transform.position.z = player.transform.position.z;

		
	if(transform.position.x > maxPosX)
		transform.position.x = maxPosX;
	
	if(transform.position.x < minPosX)
		transform.position.x = minPosX;
	
	if(transform.position.z > maxPosZ)
		transform.position.z = maxPosZ;
	
	if(transform.position.z < minPosZ)
		transform.position.z = minPosZ;
	}
	
	
}

function ChangeCameraMode()
{
	chaseCameraOn = !chaseCameraOn;
	
	if (!chaseCameraOn)
	{
		transform.position = staticPos;
		chaseCameraHeight = staticPos.y;
	}
	else
	{
		chaseCameraHeight = setLowestCameraHeight;
		transform.position.y = chaseCameraHeight;
	}
}
