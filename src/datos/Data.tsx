class DataStuff
{

    testing: string = "";
    

    getTesting = () =>
    {
        return this.testing;
    }

    // static getTesting()
    // {
    //     return this.testing;
    // }


}

export const newX = new DataStuff();
newX.getTesting();