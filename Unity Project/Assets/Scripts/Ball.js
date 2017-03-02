 #pragma strict

public var ballForce: Vector3;
public var damage: int;
public var canDamage: boolean;
public var explosion: GameObject;
public var line: LineRenderer;
public var nextLine: float;

function Start () 
{
	ballForce = GetComponentInParent(Cannon).force;
	this.gameObject.GetComponent.<Rigidbody>().AddRelativeForce(ballForce);

	if (PlayerPrefs.GetInt("CannonBall") < 1)
	{
		PlayerPrefs.SetInt("CannonBall", 1);
	}

	damage = 10 * PlayerPrefs.GetInt("CannonBall");

	line.SetPosition(0, transform.position);
	nextLine = Time.time + 0.05;
}

function Update () 
{
	if(transform.position.y <= 70)
	{
		Cannon.shotsMissed ++;
		Destroy(this.gameObject);
	}

	if(nextLine < Time.time)
	{
		line.numPositions = line.numPositions + 1;
		line.SetPosition(line.numPositions - 1, transform.position);
		nextLine = Time.time + 0.05;
	}
}

function OnCollisionEnter(other: Collision)
{
	if(other.gameObject.tag == "Enemy" && canDamage)
	{
		other.gameObject.GetComponentInParent(Boss).health -= damage;
		canDamage = false;
		Instantiate(explosion, transform.position, transform.rotation);
		Cannon.shotsHit ++;
		Destroy(this.gameObject);
	}

}