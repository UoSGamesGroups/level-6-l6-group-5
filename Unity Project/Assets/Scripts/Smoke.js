#pragma strict

public var smoke: ParticleSystem;

function Start () 
{
	smoke.emissionRate = 0;

	yield WaitForSeconds(2);
	Destroy(this.gameObject);
}

