/**
 * SQL adaptation of the Kalman Filter for 1D data.
 * Originally written in JavaScript by Wouter Bulten.
 *
 * @license MIT License
 *
 * @author trademark18 (on behalf of archetypesc)
 *
 * @see https://github.com/wouterbulten/kalmanjs
 *
 */

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE OR ALTER PROCEDURE [dbo].[sp_kalman]
	@identifier VARCHAR(32)
	,@z FLOAT
	,@prediction FLOAT OUTPUT
AS
BEGIN

SET NOCOUNT ON;

-- Declare variables to be used in Kalman Filter
DECLARE @R FLOAT = 1;
DECLARE @Q FLOAT = 1;
DECLARE @A FLOAT = 1;
DECLARE @B FLOAT = 0;
DECLARE @C FLOAT = 1;

DECLARE @cov FLOAT;
DECLARE @predX FLOAT;
DECLARE @predCov FLOAT;
DECLARE @K FLOAT;

DECLARE @x FLOAT = NULL;
DECLARE @u FLOAT = 0.0;

-- Check to see if state table exists
IF OBJECT_ID('KalmanState', 'U') IS NULL
BEGIN
	BEGIN TRY
		-- Attempt to create state table
		CREATE TABLE [dbo].[KalmanState](
				[id] [int] IDENTITY(1,1) NOT NULL,
				[x] [float] NULL,
				[cov] [float] NULL,
				[predX] [float] NULL,
				[predCov] [float] NULL,
				[K] [float] NULL,
				[identifier] [varchar](32) NOT NULL
			) ON [PRIMARY]
	END TRY
	BEGIN CATCH
		-- Unable to create table for some reason.  Print a message to the user with the script they need to run
		PRINT 'KalmanState table doesn''t exist, and the attempt to create it failed (likely insufficient permissions).  Run
			CREATE TABLE [dbo].[KalmanState](
				[id] [int] IDENTITY(1,1) NOT NULL,
				[x] [float] NULL,
				[cov] [float] NULL,
				[predX] [float] NULL,
				[predCov] [float] NULL,
				[K] [float] NULL,
				[identifier] [varchar](32) NOT NULL
			) ON [PRIMARY]
			GO';
		RETURN 3; -- Status code 3 for error result https://docs.microsoft.com/en-us/sql/relational-databases/stored-procedures/return-data-from-a-stored-procedure?view=sql-server-ver15#examples-of-return-codes
	END CATCH
END


-- Populate existing state
SELECT TOP 1
	@x = x
	,@cov = cov
	,@K = K
	,@predX = predX
	,@predCov = predCov
	FROM KalmanState
	WHERE identifier = @identifier
	ORDER BY id DESC


-- This code is translated directly from Kalman.js by wouterbulten
-- https://github.com/wouterbulten/kalmanjs
-- https://github.com/wouterbulten/kalmanjs/blob/713bb61799fe508a79868a123c916db75ee7a777/dist/kalman.js#L84
IF (@x IS NULL)
BEGIN
	PRINT 'No existing state; proceeding without it';
	SET @x = 1 / @C * @z;
	SET @cov = 1 / @C * @Q * (1 / @C);
END
ELSE
BEGIN
	SET @predX = @A * @x + @B * @u;
	SET @predCov = @A * @cov * @A + @R;

	SET @K = @predCov * @C * (1 / (@C * @predCov * @C + @Q));

	SET @x = @predX + @K * (@z - @C * @predX);
	SET @cov = @predCov - @K * @C * @predCov;

END


-- Clear any existing state
DELETE FROM KalmanState WHERE identifier = @identifier;

-- Save state
INSERT INTO KalmanState
VALUES
(
	@x
	,@cov
	,@predX
	,@predCov
	,@K
	,@identifier
)

-- Select final prediction
SET @prediction = @x;
RETURN 0; -- Clean exit status code

END
GO