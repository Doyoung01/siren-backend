/* sequelize에서 테이블 정의 */
module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define(
        'user', // 테이블 이름과 동일하게 설정
        /* DB 속성 정의 */
        {
            num: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true, 
            },
            id: {
                type: DataTypes.STRING(255),
                allowNull: false,
                comment: '',
            },
            pw: {
                type: DataTypes.STRING(255),
                allowNull: false,
                comment: '',
            },
            factoryTime: {
                type: DataTypes.INTEGER,
                allowNull:false,
                comment:'공장 맵 클리어 타임',
            },
            restaurantTime: {
                type: DataTypes.INTEGER,
                allowNull: false,
                comment: '레스토랑 클리어 타임'
            },
            houseTime: {
                type: DataTypes.INTEGER,
                allowNull: false,
                comment: '집 클리어 타임',
            }
        },
        /* 부가 설정 */
        {
            tableName: 'user',      // DB에 저장될 테이블 이름
            freezeTableName: false,
            underscored: false,
            timestamps: false,      // createdAt, updatedAt 자동 설정
        }
    );  
    return user;
};
