#pragma strict
public var boat: Rigidbody;
public var force: Vector3;
public var pSystem: ParticleSystem;
private var windTimer: float;
public var windTimerRandMax: float;
public var windTimerRandMin: float;


function Update () 
{

// if timer expires then make wind effect
if (windTimer < 0)
{
	pSystem.Play();;
	MoveBoat();
// random gust time can be set in inspector
	windTimer = Random.Range(windTimerRandMin,windTimerRandMax);
}	
//decrease timer over time
	windTimer -= 1 * Time.deltaTime;
	
	
if (Input.GetKeyDown(KeyCode.W))
	{
		boat.AddForce(force);
	}

}
//add force to boat then disable wind system then random the time unitl next gust
function MoveBoat()
{
	yield WaitForSeconds(4);
	boat.AddForce(force);
	pSystem.Stop();
}