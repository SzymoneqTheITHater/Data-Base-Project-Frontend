export default interface IDjangoResponse<CollectionType> {
    count: number,
    next: any,
    previous: any,
    results: CollectionType[],

}